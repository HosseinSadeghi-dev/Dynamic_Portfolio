import * as fs from "fs";
import {InternalServerErrorException} from "@nestjs/common";

export function deleteLocalFile(path: string): void {
    try {
        fs.unlinkSync('./../client/src/assets/upload/' + path)
        // fs.unlinkSync(path)
    } catch(err) {
        console.log('deleteLocalFile', err)
        throw new InternalServerErrorException()
    }

}
