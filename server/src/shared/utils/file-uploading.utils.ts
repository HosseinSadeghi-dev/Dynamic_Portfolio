import {extname} from 'path';
import {InternalServerErrorException} from "@nestjs/common";

export const imageFileFilter = (req, file, callback) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif|svg)$/)) {
        return callback(new InternalServerErrorException('فقط فرمت های jpg|jpeg|png|gif|svg قابل پذیرش هستند'), false);
    }
    callback(null, true);
};

export const videoFileFilter = (req, file, callback) => {
    if (!file.originalname.match(/\.(mp4|flv|m3u8|mov)$/)) {
        return callback(new Error('Only video files are allowed!'), false);
    }
    callback(null, true);
};

export const editFileName = (req, file, callback) => {
    const name = file.originalname.split('.')[0];
    const fileExtName = extname(file.originalname);
    const randomName = Array(4)
        .fill(null)
        .map(() => Math.round(Math.random() * 16).toString(16))
        .join('');
    callback(null, `${name}-${randomName}${fileExtName}`);
};
