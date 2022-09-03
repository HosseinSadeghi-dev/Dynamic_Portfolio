import {ResponseModel} from "./global.model";

export function handleResponse(msg: string, status: number = 200): ResponseModel {
    return {
        message: msg,
        status: status
    };
}
