import {Injectable, InternalServerErrorException} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {SeoEntity} from "../entity/seo.entity";
import {SeoDto} from "../dto/seo.dto";

@Injectable()
export class SeoService {

    constructor(
        @InjectRepository(SeoEntity)
        private seoRepository: Repository<SeoEntity>,
    ) {
    }

    async getSeo(): Promise<SeoEntity[]> {
        return await this.seoRepository
            .createQueryBuilder('seo')
            .getMany()
    }

    async findOneSeo(url: string): Promise<SeoEntity> {
        return await this.seoRepository.findOneBy({url: url})
    }

    async setSeo(seoDto: SeoDto): Promise<SeoEntity> {
        try {
            let _seo: SeoEntity = new SeoEntity(seoDto)
            return await _seo.save()
        } catch (e) {
            throw new InternalServerErrorException(e)
        }
    }

}
