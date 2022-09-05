import {Body, Controller, Get, Post, Query, UseGuards, ValidationPipe} from '@nestjs/common';
import {BlogService} from "../services";
import {Pagination} from "../../shared/paginate";
import {BlogsFilterDto, NewBlogDto} from "../dto/blogs.dto";
import {BlogEntity} from "../entity";
import {AuthGuard} from "@nestjs/passport";

@Controller('blogs')
export class BlogController {

    constructor(
        private blogService: BlogService
    ) {
    }

    @Get()
    async getAllBlogs(
        @Query(ValidationPipe) blogsFilterDto: BlogsFilterDto
    ): Promise<Pagination<BlogEntity>> {
        return await this.blogService.getBlogsForAdmin(blogsFilterDto)
        // return await this.blogService.getBlogsForVisitor(blogsFilterDto)
    }

    @Post()
    @UseGuards(AuthGuard())
    async newPost(
        @Body(ValidationPipe) newBlogDto: NewBlogDto
    ): Promise<BlogEntity> {
        return await this.blogService.createBlog(newBlogDto)
    }

}
