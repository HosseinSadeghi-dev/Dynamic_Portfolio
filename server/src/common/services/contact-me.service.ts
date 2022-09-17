import {Injectable, InternalServerErrorException, NotFoundException} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {ContactMeEntity} from "../entity";
import {Repository, SelectQueryBuilder} from "typeorm";
import {Pagination} from "../../shared/paginate";
import {ContactMeDto, ContactMeFilterDto} from "../dto/contact-me.dto";
import {TelegramBotService} from "./telegram-bot.service";

@Injectable()
export class ContactMeService {

    constructor(
        @InjectRepository(ContactMeEntity)
        private contactMeRepository: Repository<ContactMeEntity>,
        private telegramBotService: TelegramBotService
    ) {
    }

    async getContacts(query: ContactMeFilterDto): Promise<Pagination<ContactMeEntity>> {
        const qb: SelectQueryBuilder<ContactMeEntity> = this.contactMeRepository
            .createQueryBuilder('contact-me')

        if (query.sort) {
            qb.orderBy(`contact-me.${query.sort}`, query.sortType)
        } else {
            qb.orderBy('contact-me.created', 'DESC')
        }

        query.pageSize && qb.take(query.pageSize);
        query.pageNumber && qb.skip(query.pageNumber * query.pageSize);

        return new Pagination<ContactMeEntity>({
            results: await qb.getMany(),
            total: await qb.getCount(),
        });
    }

    async requestContact(contactMeDto: ContactMeDto): Promise<ContactMeEntity> {
        try {
            const _contact: ContactMeEntity = new ContactMeEntity(contactMeDto)

            return await _contact.save()
        } catch (e) {
            throw new InternalServerErrorException(e)
        }
    }

}
