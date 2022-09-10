import {
    Body,
    Controller, Delete,
    Get, Param, ParseIntPipe,
    Post, Put,
    UploadedFile,
    UseGuards,
    UseInterceptors,
    ValidationPipe
} from '@nestjs/common';
import {SocialMediaEntity} from "../entity";
import {AuthGuard} from "@nestjs/passport";
import {FileInterceptor} from "@nestjs/platform-express";
import {editFileName, imageFileFilter} from "../../shared/utils/file-uploading.utils";
import {diskStorage} from 'multer'
import {handleResponse} from "../../shared/functions";
import {ResponseModel} from "../../shared/global.model";
import {SocialMediaService} from "../services";
import {SocialMediaDto} from "../dto/social-media.dto";

@Controller('social-media')
export class SocialMediaController {

    constructor(
        private socialMediaService: SocialMediaService
    ) {
    }

    @Get()
    async getSocialMedias(): Promise<SocialMediaEntity[]> {
        return await this.socialMediaService.getSocials()
    }

    @Post()
    @UseGuards(AuthGuard())
    @UseInterceptors(
        FileInterceptor('logo',
            {
                storage: diskStorage({
                    destination: './../client/src/assets/upload/social_medias',
                    filename: editFileName,
                }),
                fileFilter: imageFileFilter,
            })
    )
    async newSocialMedia(
        @Body(ValidationPipe) socialMediaDto: SocialMediaDto,
        @UploadedFile() logo,
    ): Promise<SocialMediaEntity> {
        return await this.socialMediaService.createSocial(socialMediaDto, logo)
    }

    @Put(':id')
    @UseGuards(AuthGuard())
    @UseInterceptors(
        FileInterceptor('logo',
            {
                storage: diskStorage({
                    destination: './../client/src/assets/upload/social_medias',
                    filename: editFileName,
                }),
                fileFilter: imageFileFilter,
            })
    )
    async editSocialMedia(
        @Body(ValidationPipe) socialMediaDto: SocialMediaDto,
        @UploadedFile() logo,
        @Param('id', ParseIntPipe) id: number
    ): Promise<SocialMediaEntity> {
        return await this.socialMediaService.editSocial(id, socialMediaDto, logo)
    }

    @Delete(':id')
    @UseGuards(AuthGuard())
    async deleteSocialMedia(
        @Param('id', ParseIntPipe) id: number
    ): Promise<ResponseModel> {
        await this.socialMediaService.deleteSocial(id)
        return handleResponse('با موفقیت حذف شد!')
    }

}
