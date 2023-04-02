import { HttpStatus, UnauthorizedException } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { authTypes } from "../../common/code-type/auth.code-type";

export class JwtAuthGuard extends AuthGuard('jwt') {
    handleRequest(err: any, user: any) {
        if (err || !user) {
            throw err || new UnauthorizedException({
                status: HttpStatus.BAD_REQUEST,
                data: [authTypes().AUTH_NOTMATCH]
            }) 
        }
        return user;
    }
}