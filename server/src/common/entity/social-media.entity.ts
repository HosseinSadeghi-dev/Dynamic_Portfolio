import {BaseEntity, Column, Entity, PrimaryColumn, Unique} from "typeorm";
import {SocialMediaDto} from "../dto/social-media.dto";

@Entity('socialMedia')
@Unique(['title'])
export class SocialMediaEntity extends BaseEntity{

    constructor(socialMediaDto: SocialMediaDto) {
        super();

        this.title = socialMediaDto?.title
        this.link = socialMediaDto?.link
    }

    @PrimaryColumn()
    title: string;

    @Column()
    link: string

}
