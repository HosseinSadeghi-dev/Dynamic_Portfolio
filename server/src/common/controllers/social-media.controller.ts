import {
    Body,
    Controller,
    Get, Put, UseGuards,
    ValidationPipe
} from '@nestjs/common';
import {SocialMediaEntity} from "../entity";
import {AuthGuard} from "@nestjs/passport";
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

    @Put('')
    @UseGuards(AuthGuard())
    async editSocialMedia(
        @Body(ValidationPipe) socialMediaDto: SocialMediaDto,
    ): Promise<SocialMediaEntity> {
        return await this.socialMediaService.editSocial(socialMediaDto)
    }

}
