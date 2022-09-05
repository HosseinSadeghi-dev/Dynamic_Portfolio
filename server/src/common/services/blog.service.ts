import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository, SelectQueryBuilder} from "typeorm";
import {BlogEntity} from "../entity";
import {Pagination} from "../../shared/paginate";
import {BlogsFilterDto, NewBlogDto} from "../dto/blogs.dto";

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
        query.pageSize && qb.take(query.pageSize);
        query.pageNumber && qb.skip(query.pageNumber * query.pageSize);

        return new Pagination<BlogEntity> ({
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

        return new Pagination<BlogEntity> ({
            results: await qb.getMany(),
            total: await qb.getCount(),
        });
    }

    async createBlog(newBlogDto: NewBlogDto): Promise<BlogEntity> {
        const _blog: BlogEntity = new BlogEntity()

        _blog.title = newBlogDto.title
        _blog.description = newBlogDto.description
        if (newBlogDto.status) {
            _blog.status = newBlogDto.status
        }

        return
    }

}
