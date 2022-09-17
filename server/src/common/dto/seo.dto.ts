import {IsNotEmpty, IsOptional} from "class-validator";

export class SeoDto {
    @IsNotEmpty()
    url: string;

    @IsNotEmpty()
    keywords: string;

    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    description: string;

    @IsOptional()
    'og:locale' : string;

    @IsOptional()
    'og:type': string;

    @IsOptional()
    'og:title': string;

    @IsOptional()
    'og:description': string;

    @IsOptional()
    'og:url': string;

    @IsOptional()
    'og:site_name': string;

    @IsOptional()
    'og:image': string;

    @IsOptional()
    'twitter:url': string;

    @IsOptional()
    'twitter:title': string;

    @IsOptional()
    'twitter:description': string;
}
