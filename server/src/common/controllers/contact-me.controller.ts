import {
    Body,
    Controller,
    Get, Param, ParseIntPipe, Post,
    Put, Query,
    UseGuards,
    ValidationPipe
} from '@nestjs/common';
import {ContactMeEntity, SocialMediaEntity} from "../entity";
import {AuthGuard} from "@nestjs/passport";
import {ContactMeService, SocialMediaService} from "../services";
import {SocialMediaDto} from "../dto/social-media.dto";
import {ContactMeDto, ContactMeFilterDto} from "../dto/contact-me.dto";
import {Pagination} from "../../shared/paginate";

@Controller('contact-me')
export class ContactMeController {

    constructor(
        private contactMeDto: ContactMeService
    ) {
    }

    @Get()
    @UseGuards(AuthGuard())
    async getSocialMedias(
        @Query(ValidationPipe) contactMeFilterDto: ContactMeFilterDto
    ): Promise<Pagination<ContactMeEntity>> {
        return await this.contactMeDto.getContacts(contactMeFilterDto)
    }

    @Post()
    async editSocialMedia(
        @Body(ValidationPipe) contactMeDto: ContactMeDto,
    ): Promise<ContactMeEntity> {
        return await this.contactMeDto.requestContact(contactMeDto)
    }

}
