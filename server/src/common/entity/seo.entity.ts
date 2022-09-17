import {BaseEntity, Column, Entity, PrimaryColumn, Unique} from 'typeorm';
import {SeoDto} from "../dto/seo.dto";

@Entity('seo')
@Unique(['url'])
export class SeoEntity extends BaseEntity {

    constructor(seoDto: SeoDto) {
        super();

        this.url = seoDto?.url;
        this.keywords = seoDto?.keywords;
        this.title = seoDto?.title;
        this.description = seoDto?.description;

        if (seoDto) {
            this['og:locale'] = seoDto["og:locale"] ? seoDto["og:locale"] : null;
            this['og:type'] = seoDto["og:type"] ? seoDto["og:type"] : null;
            this['og:title'] = seoDto["og:title"] ? seoDto["og:title"] : null;
            this['og:description'] = seoDto["og:description"] ? seoDto["og:description"] : null;
            this['og:url'] = seoDto["og:url"] ? seoDto["og:url"] : null;
            this['og:site_name'] = seoDto["og:site_name"] ? seoDto["og:site_name"] : null;
            this['og:image'] = seoDto["og:image"] ? seoDto["og:image"] : null;
            this['twitter:url'] = seoDto["twitter:url"] ? seoDto["twitter:url"] : null;
            this['twitter:title'] = seoDto["twitter:title"] ? seoDto["twitter:title"] : null;
            this['twitter:description'] = seoDto["twitter:description"] ? seoDto["twitter:description"] : null;
        }
    }

    @PrimaryColumn()
    url: string;

    @Column({nullable: true})
    keywords: string;

    @Column({nullable: true})
    title: string;

    @Column({nullable: true})
    description: string;

    @Column({nullable: true})
    'og:locale': string;

    @Column({nullable: true})
    'og:type': string;

    @Column({nullable: true})
    'og:title': string;

    @Column({nullable: true})
    'og:description': string;

    @Column({nullable: true})
    'og:url': string;

    @Column({nullable: true})
    'og:site_name': string;

    @Column({nullable: true})
    'og:image': string;

    @Column({nullable: true})
    'twitter:url': string;

    @Column({nullable: true})
    'twitter:title': string;

    @Column({nullable: true})
    'twitter:description': string;

}
