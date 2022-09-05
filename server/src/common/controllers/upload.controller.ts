import {Controller, Post, UploadedFile, UseGuards, UseInterceptors} from "@nestjs/common";
import {AuthGuard} from "@nestjs/passport";
import {FileInterceptor} from "@nestjs/platform-express";
import {editFileName, imageFileFilter} from "../../shared/utils/file-uploading.utils";
import {Observable, of} from "rxjs";
import {diskStorage} from 'multer'

@Controller('/upload')
export class UploadController {

    constructor() {
    }

    @Post()
    @UseGuards(AuthGuard())
    @UseInterceptors(
        FileInterceptor('file',
            {
                storage: diskStorage({
                    destination: './../client/src/assets/upload',
                    filename: editFileName,
                }),
                fileFilter: imageFileFilter,
            })
    )
    uploadFile(
        @UploadedFile() file
    ): Observable<Object> {
        return of({
            imagePath: file.path
        })
    }

}
