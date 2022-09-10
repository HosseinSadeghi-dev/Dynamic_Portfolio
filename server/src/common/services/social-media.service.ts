import {Injectable, InternalServerErrorException, NotFoundException} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {BlogEntity, SocialMediaEntity} from "../entity";
import {Repository, SelectQueryBuilder} from "typeorm";
import {SocialMediaDto} from "../dto/social-media.dto";
import {deleteLocalFile} from "../../shared/utils/file_deleting.utils";

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
            .where('deleted = false')
        return await qb.getMany()
    }

    async findOneSocial(id: number): Promise<SocialMediaEntity> {
        const _found = await this.socialMediaRepository.findOneBy({id: id})

        if (!_found) {
            throw new NotFoundException('شبکه اجتماعی مورد نظر پیدا نشد!')
        }

        return _found
    }

    async createSocial(socialMediaDto: SocialMediaDto, logo): Promise<SocialMediaEntity> {
        const _social: SocialMediaEntity = new SocialMediaEntity()

        _social.link = socialMediaDto.link
        _social.title = socialMediaDto.title

        if (logo) {
            _social.logo = `assets${logo?.destination.split("assets")[1]}/${logo?.filename}`
        }

        try {
            return await _social.save()
        }catch (e) {
            throw new InternalServerErrorException(e)
        }

    }

    async editSocial(id: number, socialMediaDto: SocialMediaDto, logo): Promise<SocialMediaEntity> {
        try {
            let _social: SocialMediaEntity = await this.findOneSocial(id)

            _social.link = socialMediaDto.link
            _social.title = socialMediaDto.title

            if (socialMediaDto.imageDeleted === true) {
                deleteLocalFile('social_medias' + _social.logo.slice(_social.logo.lastIndexOf('/')))
                _social.logo = null
            } else if (logo) {
                deleteLocalFile('social_medias' + _social.logo.slice(_social.logo.lastIndexOf('/')))
                _social.logo = `assets${logo?.destination.split("assets")[1]}/${logo?.filename}`
            }

            return await _social.save()
        } catch (e) {
            throw new InternalServerErrorException(e)
        }
    }

    async deleteSocial(id: number): Promise<any> {
        if (await this.findOneSocial(id)) {
            return await this.socialMediaRepository
                .createQueryBuilder()
                .update(SocialMediaEntity)
                .set({deleted: true})
                .where("id = :id", {id: id})
                .execute()
        }
    }

}
