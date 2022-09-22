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
import {BlogService} from "../services";
import {Pagination} from "../../shared/paginate";
import {BlogsDateFilter, BlogsFilterDto, EditBlogDto, NewBlogDto} from "../dto/blogs.dto";
import {BlogEntity, UserEntity} from "../entity";
import {AuthGuard} from "@nestjs/passport";
import {FileInterceptor} from "@nestjs/platform-express";
import {editFileName, imageFileFilter} from "../../shared/utils/file-uploading.utils";
import {diskStorage} from 'multer'
import {of} from "rxjs";
import {GetUser} from "../../shared/decorators/get-user.decorator";
import {handleResponse} from "../../shared/functions";
import {ResponseModel} from "../../shared/global.model";
import {BlogStatus} from "../models/blog.model";

@Controller('blogs')
export class BlogController {

    constructor(
        private blogService: BlogService
    ) {
    }

    @Get('/admin')
    async getAllBlogsAdmin(
        @Query(ValidationPipe) blogsFilterDto: BlogsFilterDto
    ): Promise<Pagination<BlogEntity>> {
        return await this.blogService.getBlogsForAdmin(blogsFilterDto)
    }

    @Get()
    async getAllBlogsViewer(
        @Query(ValidationPipe) blogsFilterDto: BlogsFilterDto
    ): Promise<Pagination<BlogEntity>> {
        return await this.blogService.getBlogsForVisitor(blogsFilterDto)
    }

    @Get('/admin/:id')
    async getOneBlogAdmin(
        @Param('id', ParseIntPipe) id: number
    ): Promise<BlogEntity> {
        return await this.blogService.findOneBlogAdmin(id)
    }

    @Get('/admin/date/:id')
    async getDateFilter(
        @Query() queryDate: BlogsDateFilter,
        @Param('id', ParseIntPipe) id: number
    ): Promise<number> {
        return await this.blogService.getBlogFilterDate(id, queryDate)
    }

    @Get('/:id')
    async getOneBlogVisitor(
        @Param('id', ParseIntPipe) id: number
    ): Promise<BlogEntity> {
        return await this.blogService.findOneBlogVisitor(id)
    }

    @Post()
    @UseGuards(AuthGuard())
    @UseInterceptors(
        FileInterceptor('image',
            {
                storage: diskStorage({
                    destination: './../client/src/assets/upload/blogs',
                    filename: editFileName,
                }),
                fileFilter: imageFileFilter,
            })
    )
    async newBlog(
        @Body(ValidationPipe) newBlogDto: NewBlogDto,
        @UploadedFile() image,
        @GetUser() user: UserEntity,
    ): Promise<BlogEntity> {
        return await this.blogService.createBlog(newBlogDto, user, image)
    }

    @Put(':id')
    @UseGuards(AuthGuard())
    @UseInterceptors(
        FileInterceptor('image',
            {
                storage: diskStorage({
                    destination: './../client/src/assets/upload/blogs',
                    filename: editFileName,
                }),
                fileFilter: imageFileFilter,
            })
    )
    async editBlog(
        @Body(ValidationPipe) editBlogDto: EditBlogDto,
        @UploadedFile() image,
        @GetUser() user: UserEntity,
        @Param('id', ParseIntPipe) id: number
    ): Promise<BlogEntity> {
        return await this.blogService.editBlog(id, editBlogDto, user, image)
    }

    @Patch(':id')
    @UseGuards(AuthGuard())
    async editBlogStatus(
        @Body(ValidationPipe) body: { status: BlogStatus },
        @Param('id', ParseIntPipe) id: number
    ): Promise<ResponseModel> {
        await this.blogService.changeBlogStatus(id, body.status)
        return handleResponse('با موفقیت ویرایش شد!')
    }

    @Delete(':id')
    @UseGuards(AuthGuard())
    async deleteBlog(
        @Param('id', ParseIntPipe) id: number
    ): Promise<ResponseModel> {
        await this.blogService.deleteBlog(id)
        return handleResponse('با موفقیت حذف شد!')
    }

}
