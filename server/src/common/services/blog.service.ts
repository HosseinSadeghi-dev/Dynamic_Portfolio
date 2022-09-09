import {Injectable, InternalServerErrorException, NotFoundException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository, SelectQueryBuilder} from "typeorm";
import {BlogEntity, UserEntity} from "../entity";
import {Pagination} from "../../shared/paginate";
import {BlogsFilterDto, EditBlogDto, NewBlogDto} from "../dto/blogs.dto";
import {BlogStatus} from "../models/blog.model";
import {deleteLocalFile} from "../../shared/utils/file_deleting.utils";

@Injectable()
export class BlogService {

    constructor(
        @InjectRepository(BlogEntity)
        private blogRepository: Repository<BlogEntity>,
    ) {
    }

    async getBlogsForAdmin(query: BlogsFilterDto): Promise<Pagination<BlogEntity>> {
        const qb: SelectQueryBuilder<BlogEntity> = this.blogRepository
            .createQueryBuilder('blog')
            .where('(blog.deleted = false)')

        query.searchText && qb.orWhere('(blog.title LIKE :title)', {title: `%${query.searchText}%`})
        query.searchText && qb.orWhere('(blog.description LIKE :description)', {description: `%${query.searchText}%`})
        query.status && qb.andWhere('(blog.status = :status)', {status: query.status})
        query.createdBy && qb.andWhere('(blog.userNameCreated LIKE :userNameCreated)', {userNameCreated: `%${query.createdBy}%`})
        query.editedBy && qb.andWhere('(blog.userNameEdited LIKE :userNameEdited)', {userNameEdited: `%${query.editedBy}%`})

        query.pageSize && qb.take(query.pageSize);
        query.pageNumber && qb.skip(query.pageNumber * query.pageSize);

        return new Pagination<BlogEntity>({
            results: await qb.getMany(),
            total: await qb.getCount(),
        });
    }

    async getBlogsForVisitor(query: BlogsFilterDto): Promise<Pagination<BlogEntity>> {
        const qb: SelectQueryBuilder<BlogEntity> = this.blogRepository
            .createQueryBuilder('blog')
            .where('(blog.deleted = false)')
            .andWhere('(blog.status = 0)')

        query.searchText && qb.orWhere('(blog.title LIKE :title)', {title: `%${query.searchText}%`})
        query.searchText && qb.orWhere('(blog.description LIKE :description)', {description: `%${query.searchText}%`})
        query.pageSize && qb.take(query.pageSize);
        query.pageNumber && qb.skip(query.pageNumber * query.pageSize);

        qb.select('blog.id');
        qb.addSelect('blog.title')
        qb.addSelect('blog.description')
        qb.addSelect('blog.image')
        qb.addSelect('blog.seen')
        qb.addSelect('blog.created')

        return new Pagination<BlogEntity>({
            results: await qb.getMany(),
            total: await qb.getCount(),
        });
    }

    async findOneBlogAdmin(id: number): Promise<BlogEntity> {
        const _found = await this.blogRepository.findOneBy({id: id})

        if (!_found) {
            throw new NotFoundException('بلاگ مورد نظر پیدا نشد!')
        }

        return _found
    }

    async findOneBlogVisitor(id: number): Promise<BlogEntity> {
        const _found = await this.findOneBlogAdmin(id)
        await _found.moreSeen()

        return {
            id: _found.id,
            title: _found.title,
            description: _found.description,
            image: _found.image,
            created: _found.created
        } as BlogEntity
    }

    async createBlog(newBlogDto: NewBlogDto, user: UserEntity, image): Promise<BlogEntity> {
        const _blog: BlogEntity = new BlogEntity()

        _blog.title = newBlogDto.title
        _blog.description = newBlogDto.description
        _blog.userNameCreated = _blog.userNameEdited = user.username

        if (image) {
            _blog.image = `assets${image?.destination.split("assets")[1]}/${image?.filename}`
        }

        if (newBlogDto.status) {
            _blog.status = newBlogDto.status
        }

        try {
            return _blog.save();
        } catch (e) {
            throw new InternalServerErrorException()
        }
    }

    async editBlog(id: number, editBlogDto: EditBlogDto, user: UserEntity, image): Promise<BlogEntity> {
        const _blog: BlogEntity = await this.findOneBlogAdmin(id)

        _blog.title = editBlogDto.title
        _blog.description = editBlogDto.description
        _blog.userNameEdited = user.username

        if (editBlogDto.imageDeleted === true) {
            deleteLocalFile('blogs' + _blog.image.slice(_blog.image.lastIndexOf('/')))
            _blog.image = null
        } else if (image) {
            deleteLocalFile('blogs' + _blog.image.slice(_blog.image.lastIndexOf('/')))
            _blog.image = `assets${image?.destination.split("assets")[1]}/${image?.filename}`
        }

        if (editBlogDto.status) {
            _blog.status = editBlogDto.status
        }

        try {
            return _blog.save();
        } catch (e) {
            throw new InternalServerErrorException()
        }
    }

    async deleteBlog(id: number): Promise<any> {
        if (await this.findOneBlogAdmin(id)) {
            return await this.blogRepository
                .createQueryBuilder()
                .update(BlogEntity)
                .set({deleted: true})
                .where("id = :id", {id: id})
                .execute()
        }
    }

    async changeBlogStatus(id: number, status: BlogStatus): Promise<any> {
        if (await this.findOneBlogAdmin(id)) {
            return await this.blogRepository
                .createQueryBuilder()
                .update(BlogEntity)
                .set({status: status})
                .where("id = :id", {id: id})
                .execute()
        }
    }

}
