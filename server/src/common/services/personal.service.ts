import {Injectable, InternalServerErrorException, NotFoundException} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {PersonalEntity, SkillEntity} from "../entity";
import {Repository, SelectQueryBuilder} from "typeorm";
import {PersonalDto} from "../dto/personal.dto";
import {SkillDto} from "../dto/skill.dto";

@Injectable()
export class PersonalService {

    constructor(
        @InjectRepository(PersonalEntity)
        private personalRepository: Repository<PersonalEntity>,
        @InjectRepository(SkillEntity)
        private skillRepository: Repository<SkillEntity>,
    ) {
    }

    async getPersonal(): Promise<PersonalEntity> {
        const qb: SelectQueryBuilder<PersonalEntity> = this.personalRepository
            .createQueryBuilder('personal')
        const _personal: PersonalEntity[] = await qb.getMany()
        return _personal[0]
    }

    async editPersonal(personalDto: PersonalDto, cv): Promise<PersonalEntity> {
        try {
            let _personal: PersonalEntity = await this.getPersonal()

            if (!_personal) {
                _personal = new PersonalEntity()
            }

            _personal.phoneNumber = personalDto.phoneNumber ? personalDto.phoneNumber : null
            _personal.fullName = personalDto.fullName ? personalDto.fullName : null
            _personal.age = personalDto.age ? personalDto.age : null
            _personal.mainField = personalDto.mainField ? personalDto.mainField : null
            _personal.nationality = personalDto.nationality ? personalDto.nationality : null
            _personal.languages = personalDto.languages ? personalDto.languages : null
            _personal.desc = personalDto.desc ? personalDto.desc : null
            _personal.email = personalDto.email ? personalDto.email : null
            _personal.address = personalDto.address ? personalDto.address : null

            if (cv) {
                _personal.cv = `assets${cv?.destination.split("assets")[1]}/${cv?.filename}`
            }

            return await _personal.save()
        } catch (e) {
            throw new InternalServerErrorException(e)
        }
    }

    async getSkills(): Promise<SkillEntity[]> {
        try {
            return await this.skillRepository
                .createQueryBuilder('skill')
                .where('(skill.deleted = false)')
                .getMany()
        } catch (e) {
            throw new InternalServerErrorException()
        }
    }

    async findOneSkill(id: number): Promise<SkillEntity> {
        const _found = await this.skillRepository.findOneBy({id: id})

        if (!_found) {
            throw new NotFoundException('مهارت مورد نظر پیدا نشد!')
        }

        return _found
    }

    async handleSkill(skillDto: SkillDto, id?: number): Promise<SkillEntity> {
        try {
            let _skill!: SkillEntity;
            if (id) {
                _skill = await this.findOneSkill(id);
            } else {
                _skill = new SkillEntity(skillDto)
            }
            return await _skill.save()
        } catch (e) {
            throw new InternalServerErrorException();
        }
    }

    async deleteSkill(id: number): Promise<any> {
        if (await this.skillRepository.findOne({where: {id: id}})) {
            return await this.skillRepository
                .createQueryBuilder()
                .update(SkillEntity)
                .set({deleted: true})
                .where("id = :id", {id: id})
                .execute()
        }
    }
}
