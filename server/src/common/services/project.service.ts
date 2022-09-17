import {Injectable, InternalServerErrorException, NotFoundException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository, SelectQueryBuilder} from "typeorm";
import {Pagination} from "../../shared/paginate";
import {deleteLocalFile} from "../../shared/utils/file_deleting.utils";
import {ProjectEntity} from "../entity";
import {ProjectStatus} from "../models/project.model";
import {EditProjectDto, NewProjectDto, ProjectsFilterDto} from "../dto/projects.dto";

@Injectable()
export class ProjectService {

    constructor(
        @InjectRepository(ProjectEntity)
        private projectRepository: Repository<ProjectEntity>,
    ) {
    }

    async getProjectsForAdmin(query: ProjectsFilterDto): Promise<Pagination<ProjectEntity>> {
        const qb: SelectQueryBuilder<ProjectEntity> = this.projectRepository
            .createQueryBuilder('project')
            .where('(project.deleted = false)')
            .orderBy('project.created', 'DESC')

        if (query.searchText) {
            qb.where('project.title LIKE :nameFilter', {nameFilter: `%${query.searchText}%` })
        }

        if (query.status) {
            qb.where('(project.status = :statusFilter)', {statusFilter: query.status})
        }

        if (query.sort) {
            console.log('sort', query.sort)
            qb.orderBy(`project.${query.sort}`, query.sortType)
        }

        query.pageSize && qb.take(query.pageSize);
        query.pageNumber && qb.skip(query.pageNumber * query.pageSize);

        return new Pagination<ProjectEntity>({
            results: await qb.getMany(),
            total: await qb.getCount(),
        });
    }

    async getProjectsForVisitor(query: ProjectsFilterDto): Promise<Pagination<ProjectEntity>> {
        const qb: SelectQueryBuilder<ProjectEntity> = this.projectRepository
            .createQueryBuilder('project')
            .where('(project.deleted = false)')
            .where('(project.status = 0)')
            .orderBy('project.created', 'DESC')

        query.pageSize && qb.take(query.pageSize);
        query.pageNumber && qb.skip(query.pageNumber * query.pageSize);

        qb.select('project.id');
        qb.addSelect('project.title')
        qb.addSelect('project.description')
        qb.addSelect('project.image')
        qb.addSelect('project.seen')

        return new Pagination<ProjectEntity>({
            results: await qb.getMany(),
            total: await qb.getCount(),
        });
    }

    async findOneProjectAdmin(id: number): Promise<ProjectEntity> {
        const _found = await this.projectRepository.findOneBy({id: id})

        if (!_found) {
            throw new NotFoundException('پروژه مورد نظر پیدا نشد!')
        }

        return _found
    }

    async findOneProjectVisitor(id: number): Promise<ProjectEntity> {
        const _found = await this.findOneProjectAdmin(id)
        await _found.moreSeen()

        return {
            id: _found.id,
            title: _found.title,
            description: _found.description,
            image: _found.image,
            keywords: _found.keywords,
            created: _found.created,
            externalLink: _found.externalLink,
            seen: _found.seen
        } as ProjectEntity
    }

    async createProject(newProjectDto: NewProjectDto, image): Promise<ProjectEntity> {
        const _project: ProjectEntity = new ProjectEntity()

        _project.title = newProjectDto.title
        _project.description = newProjectDto.description
        _project.keywords = newProjectDto.keywords
        _project.externalLink = newProjectDto.externalLink

        if (image) {
            _project.image = `assets${image?.destination.split("assets")[1]}/${image?.filename}`
        }

        if (newProjectDto.status) {
            _project.status = newProjectDto.status
        }

        try {
            return _project.save();
        } catch (e) {
            throw new InternalServerErrorException()
        }
    }

    async editProject(id: number, editProjectDto: EditProjectDto, image): Promise<ProjectEntity> {
        const _project: ProjectEntity = await this.findOneProjectAdmin(id)

        _project.title = editProjectDto.title
        _project.description = editProjectDto.description
        _project.keywords = editProjectDto.keywords
        _project.externalLink = editProjectDto.externalLink
        _project.updated = new Date()

        if (editProjectDto.imageDeleted === true && _project.image) {
            deleteLocalFile('projects' + _project.image.slice(_project.image.lastIndexOf('/')))
            _project.image = null
        } else if (image && _project.image) {
            deleteLocalFile('projects' + _project.image.slice(_project.image.lastIndexOf('/')))
            _project.image = `assets${image?.destination.split("assets")[1]}/${image?.filename}`
        } else if (image) {
            _project.image = `assets${image?.destination.split("assets")[1]}/${image?.filename}`
        }

        if (editProjectDto.status) {
            _project.status = editProjectDto.status
        }

        try {
            return _project.save();
        } catch (e) {
            throw new InternalServerErrorException()
        }
    }

    async deleteProject(id: number): Promise<any> {
        if (await this.findOneProjectAdmin(id)) {
            return await this.projectRepository
                .createQueryBuilder()
                .update(ProjectEntity)
                .set({deleted: true})
                .where("id = :id", {id: id})
                .execute()
        }
    }

    async changeProjectStatus(id: number, status: ProjectStatus): Promise<any> {
        if (await this.findOneProjectAdmin(id)) {
            return await this.projectRepository
                .createQueryBuilder()
                .update(ProjectEntity)
                .set({status: status})
                .where("id = :id", {id: id})
                .execute()
        }
    }

}
