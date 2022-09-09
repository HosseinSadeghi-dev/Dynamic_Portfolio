import {
    Body,
    Controller, Delete,
    Get, Param, ParseIntPipe, Patch,
    Post, Put,
    Query,
    UploadedFile,
    UseGuards,
    UseInterceptors,
    ValidationPipe
} from '@nestjs/common';
import {Pagination} from "../../shared/paginate";
import {ProjectEntity, UserEntity} from "../entity";
import {AuthGuard} from "@nestjs/passport";
import {FileInterceptor, FilesInterceptor} from "@nestjs/platform-express";
import {editFileName, imageFileFilter} from "../../shared/utils/file-uploading.utils";
import {diskStorage} from 'multer'
import {GetUser} from "../../shared/decorators/get-user.decorator";
import {handleResponse} from "../../shared/functions";
import {ResponseModel} from "../../shared/global.model";
import {ProjectService} from "../services";
import {EditProjectDto, NewProjectDto, ProjectsFilterDto} from "../dto/projects.dto";
import {ProjectStatus} from "../models/project.model";

@Controller('projects')
export class ProjectController {

    constructor(
        private projectService: ProjectService
    ) {
    }

    @Get('/admin')
    async getAllProjectsAdmin(
        @Query(ValidationPipe) projectsFilterDto: ProjectsFilterDto
    ): Promise<Pagination<ProjectEntity>> {
        return await this.projectService.getProjectsForAdmin(projectsFilterDto)
    }

    @Get()
    async getAllProjectsViewer(
        @Query(ValidationPipe) projectsFilterDto: ProjectsFilterDto
    ): Promise<Pagination<ProjectEntity>> {
        return await this.projectService.getProjectsForVisitor(projectsFilterDto)
    }

    @Get('/admin/:id')
    async getOneProjectAdmin(
        @Param('id', ParseIntPipe) id: number
    ): Promise<ProjectEntity> {
        return await this.projectService.findOneProjectAdmin(id)
    }

    @Get('/:id')
    async getOneBLogVisitor(
        @Param('id', ParseIntPipe) id: number
    ): Promise<ProjectEntity> {
        return await this.projectService.findOneProjectVisitor(id)
    }

    @Post()
    @UseGuards(AuthGuard())
    @UseInterceptors(
        FileInterceptor('image',
            {
                storage: diskStorage({
                    destination: './../client/src/assets/upload/projects',
                    filename: editFileName,
                }),
                fileFilter: imageFileFilter,
            })
    )
    async newProject(
        @Body(ValidationPipe) newProjectDto: NewProjectDto,
        @UploadedFile() image,
        @GetUser() user: UserEntity,
    ): Promise<ProjectEntity> {
        return await this.projectService.createProject(newProjectDto, image)
    }

    @Put(':id')
    @UseGuards(AuthGuard())
    @UseInterceptors(
        FileInterceptor('image',
            {
                storage: diskStorage({
                    destination: './../client/src/assets/upload/projects',
                    filename: editFileName,
                }),
                fileFilter: imageFileFilter,
            })
    )
    async editProject(
        @Body(ValidationPipe) editProjectDto: EditProjectDto,
        @UploadedFile() image,
        @GetUser() user: UserEntity,
        @Param('id', ParseIntPipe) id: number
    ): Promise<ProjectEntity> {
        return await this.projectService.editProject(id, editProjectDto, image)
    }

    @Patch(':id')
    @UseGuards(AuthGuard())
    async editProjectStatus(
        @Body(ValidationPipe) status: ProjectStatus,
        @Param('id', ParseIntPipe) id: number
    ): Promise<ResponseModel> {
        await this.projectService.changeProjectStatus(id, status)
        return handleResponse('با موفقیت ویرایش شد!')
    }

    @Delete(':id')
    @UseGuards(AuthGuard())
    async deleteProject(
        @Param('id', ParseIntPipe) id: number
    ): Promise<ResponseModel> {
        await this.projectService.deleteProject(id)
        return handleResponse('با موفقیت حذف شد!')
    }

}
