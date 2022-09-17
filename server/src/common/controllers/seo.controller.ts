import {
    Body,
    Controller,
    Get,
    Put,
    UploadedFile,
    UseGuards,
    UseInterceptors,
    ValidationPipe
} from "@nestjs/common";
import {AuthGuard} from "@nestjs/passport";
import {FileInterceptor} from "@nestjs/platform-express";
import {editFileName} from "../../shared/utils/file-uploading.utils";
import {SeoService} from "../services";
import {diskStorage} from 'multer'
import {SeoDto} from "../dto/seo.dto";
import {SeoEntity} from "../entity/seo.entity";

@Controller('seo')
export class SeoController {

    constructor(
        private seoService: SeoService
    ) {
    }

    @Get()
    async getSeo(): Promise<SeoEntity[]> {
        return this.seoService.getSeo()
    }

    @Put()
    @UseGuards(AuthGuard())
    async editSetting(
        @Body(ValidationPipe) seoDto: SeoDto,
    ): Promise<SeoEntity> {
        return this.seoService.setSeo(seoDto)
    }

}
