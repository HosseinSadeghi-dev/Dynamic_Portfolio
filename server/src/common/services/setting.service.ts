import {Injectable, InternalServerErrorException} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {SettingEntity, UserEntity} from "../entity";
import {Repository, SelectQueryBuilder} from "typeorm";
import {SettingDto} from "../dto/setting.dto";

@Injectable()
export class SettingService {

    constructor(
        @InjectRepository(SettingEntity)
        private settingRepository: Repository<SettingEntity>,
    ) {
    }

    async getSetting(): Promise<SettingEntity> {
        const qb: SelectQueryBuilder<SettingEntity> = this.settingRepository
            .createQueryBuilder('setting')
        const _setting: SettingEntity[] = await qb.getMany()
        return _setting[0]
    }

    async editSetting(settingDto: SettingDto): Promise<SettingEntity> {
        try {
            let _setting: SettingEntity = await this.getSetting()
            if (!_setting) {
                _setting = new SettingEntity(settingDto)
            } else {
                _setting.fullName = settingDto.fullName
                _setting.phoneNumber = settingDto.phoneNumber
                _setting.email = settingDto.email
                _setting.primaryColor = settingDto.primaryColor
                _setting.accentColor = settingDto.accentColor
                _setting.font = settingDto.font
            }
            return await _setting.save()
        } catch (e) {
            throw new InternalServerErrorException(e)
        }
    }

}
