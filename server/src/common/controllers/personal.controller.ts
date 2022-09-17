import {
    Body,
    Controller, Delete,
    Get,
    Param, ParseIntPipe, Post,
    Put,
    UploadedFile,
    UseGuards,
    UseInterceptors,
    ValidationPipe
} from "@nestjs/common";
import {AuthGuard} from "@nestjs/passport";
import {FileInterceptor} from "@nestjs/platform-express";
import {editFileName} from "../../shared/utils/file-uploading.utils";
import {PersonalEntity, SkillEntity} from "../entity";
import {PersonalService} from "../services";
import {diskStorage} from 'multer'
import {PersonalDto} from "../dto/personal.dto";
import {SkillDto} from "../dto/skill.dto";

@Controller('personal')
export class PersonalController {

    constructor(
        private personalService: PersonalService
    ) {
    }

    @Get()
    async getSetting(): Promise<PersonalEntity> {
        return this.personalService.getPersonal()
    }

    @Put()
    @UseGuards(AuthGuard())
    @UseInterceptors(
        FileInterceptor('cv',
            {
                storage: diskStorage({
                    destination: './../client/src/assets/upload/personal',
                    filename: editFileName,
                }),
            })
    )
    async editSetting(
        @Body(ValidationPipe) personalDto: PersonalDto,
        @UploadedFile() cv,
    ): Promise<PersonalEntity> {
        return this.personalService.editPersonal(personalDto, cv)
    }

    @Get('skill')
    async getSkills(): Promise<SkillEntity[]> {
        return this.personalService.getSkills()
    }

    @Post('skill')
    @UseGuards(AuthGuard())
    async addSkill(
        @Body(ValidationPipe) skillDto: SkillDto,
    ): Promise<SkillEntity> {
        return this.personalService.handleSkill(skillDto)
    }

    @Put('skill/:id')
    @UseGuards(AuthGuard())
    async editSkill(
        @Body(ValidationPipe) skillDto: SkillDto,
        @Param('id', ParseIntPipe) id: number
    ): Promise<SkillEntity> {
        return this.personalService.handleSkill(skillDto, id)
    }

    @Delete('skill/:id')
    @UseGuards(AuthGuard())
    async deleteSkill(
        @Param('id', ParseIntPipe) id: number
    ): Promise<SkillEntity> {
        return this.personalService.deleteSkill(id)
    }

}
