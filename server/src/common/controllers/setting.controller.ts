import {Body, Controller, Get, Put, UploadedFile, UseGuards, UseInterceptors, ValidationPipe} from "@nestjs/common";
import {ProjectService, SettingService} from "../services";
import {AuthGuard} from "@nestjs/passport";
import {SettingDto} from "../dto/setting.dto";
import {SettingEntity} from "../entity";
import {FileInterceptor} from "@nestjs/platform-express";
import {editFileName, imageFileFilter} from "../../shared/utils/file-uploading.utils";
import {diskStorage} from 'multer'

@Controller('setting')
export class SettingController {

    constructor(
        private settingService: SettingService
    ) {
    }

    @Put()
    @UseGuards(AuthGuard())
    @UseInterceptors(
        FileInterceptor('logo',
            {
                storage: diskStorage({
                    destination: './../client/src/assets/upload/setting',
                    filename: editFileName,
                }),
                fileFilter: imageFileFilter,
            })
    )
    async editSetting(
        @Body(ValidationPipe) settingDto: SettingDto,
        @UploadedFile() logo,
    ): Promise<SettingEntity> {
        return this.settingService.editSetting(settingDto, logo)
    }

    @Get()
    async getSetting(): Promise<SettingEntity> {
        return this.settingService.getSetting()
    }

}
