import {UserRole} from "../../common/models/user.model";

export interface JwtPayload {
    username: string,
    role: UserRole
}
