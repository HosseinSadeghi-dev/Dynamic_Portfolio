import {Body, Controller, Get, Put, UseGuards, ValidationPipe} from "@nestjs/common";
import {ProjectService, SettingService} from "../services";
import {AuthGuard} from "@nestjs/passport";
import {SettingDto} from "../dto/setting.dto";
import {SettingEntity} from "../entity";

@Controller('setting')
export class SettingController {

    constructor(
        private settingService: SettingService
    ) {
    }

    @Put()
    @UseGuards(AuthGuard())
    async editSetting(
        @Body(ValidationPipe) settingDto: SettingDto
    ): Promise<SettingEntity> {
        return this.settingService.editSetting(settingDto)
    }

    @Get()
    async getSetting(): Promise<SettingEntity> {
        return this.settingService.getSetting()
    }

}
