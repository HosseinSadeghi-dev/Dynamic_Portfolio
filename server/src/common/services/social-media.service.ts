import {Injectable, InternalServerErrorException, NotFoundException} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {SocialMediaEntity} from "../entity";
import {Repository, SelectQueryBuilder} from "typeorm";
import {SocialMediaDto} from "../dto/social-media.dto";

@Injectable()
export class SocialMediaService {

    constructor(
        @InjectRepository(SocialMediaEntity)
        private socialMediaRepository: Repository<SocialMediaEntity>,
    ) {
    }

    async getSocials(): Promise<SocialMediaEntity[]> {
        const qb: SelectQueryBuilder<SocialMediaEntity> = this.socialMediaRepository
            .createQueryBuilder('social')
        return await qb.getMany()
    }

    async findOneSocial(id: number): Promise<SocialMediaEntity> {
        const _found = await this.socialMediaRepository.findOneBy({id: id})

        if (!_found) {
            throw new NotFoundException('شبکه اجتماعی مورد نظر پیدا نشد!')
        }

        return _found
    }

    async editSocial(id: number, socialMediaDto: SocialMediaDto): Promise<SocialMediaEntity> {
        try {
            let _social: SocialMediaEntity = await this.findOneSocial(id)

            _social.link = socialMediaDto.link
            _social.title = socialMediaDto.title

            return await _social.save()
        } catch (e) {
            throw new InternalServerErrorException(e)
        }
    }

}
