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

    async editSocial(socialMediaDto: SocialMediaDto): Promise<SocialMediaEntity> {
        try {
            let _social: SocialMediaEntity = new SocialMediaEntity(socialMediaDto)

            return await _social.save()
        } catch (e) {
            throw new InternalServerErrorException(e)
        }
    }

}
