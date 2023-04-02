import { Body, Controller, Get, HttpStatus, Post, Req, Res, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { authTypes } from "../common/code-type/auth.code-type";
import { Auth, User } from "../common/decorators";
import { Resp } from "../common/resp";
import { UserDto } from "../users/dtos";
import { AuthService } from "./auth.service";
import { LoginDto } from "./login.dto";
import { LocalAuthGuard } from "./guards";
import { Response, Request } from 'express';
import { CryptoService } from "../common/crypto/crypto.service";
import { cryptoTypes } from "../common/code-type/crypto.code-type";
import { userTypes } from "../common/code-type/users.code-type";
import { tokenLifeTime } from "../common/constant";

@ApiTags('Auth API')
@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly cryptoService: CryptoService,
    ){}
    
    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(
        @Body() _login: LoginDto, // Load to Swagger
        @User() userData: UserDto,
        @Res({ passthrough: true }) response: Response,
    ): Promise<Resp> {
        try {
            const data = this.authService.login(userData);
            // Encrypt
            const encryptId = this.cryptoService.encyptData(userData.id);
            response.cookie('sub', encryptId, {
                maxAge: tokenLifeTime.refreshTokenCookie,
                httpOnly: true,
            })
            delete data.refreshToken
            return {
                data: [data],
                message: authTypes().AUTH_LOGIN_SUCCESSFULLY.message,
            } 
        } catch (error) {
            return {
                data: [authTypes().AUTH_LOGIN_FAILED],
                error: error.message,
            }
        }
    }

    @Get('/get-session')
    async getSession(
        @Req() request: Request,
        @User() _user: UserDto,
    ){
        try {
            const { sub } = request.cookies;
            // Decrypt
            const { decryptData, isDecrypt } = this.cryptoService.decryptData(sub);
            if(!isDecrypt) {
                return {
                    status: HttpStatus.NOT_ACCEPTABLE,
                    data: [cryptoTypes().CRYPTO_DECRYPT_ERROR]
                }
            }
            const getRfToken = await this.authService.getRfToken(decryptData);
            if(!getRfToken) {
                return {
                    status: HttpStatus.BAD_REQUEST,
                    data: [authTypes().AUTH_REFRESH_TOKEN_EXPIRED]
                }
            }
            const verify = this.authService.verify(getRfToken);
            if(!verify.payload) {
                // return 'Vui lòng đăng nhập lại';
                return {
                    status: HttpStatus.BAD_REQUEST,
                    data: [authTypes().AUTH_LOGIN_FAILED]
                }
            }
            // Get Token from refresh token
            const findUser = await this.authService.findUser(verify.payload.sub)
            if (!findUser) {
                return {
                    status: HttpStatus.BAD_REQUEST,
                    data: [userTypes().USER_NOT_FOUND]
                }
            }
            const { id, email } = findUser;
            const accessToken = this.authService.signJWT({ sub: id, email }, tokenLifeTime.accessToken);
            return {
                data: [{
                    user: UserDto.plainToClass(findUser),
                    accessToken,
                }],
                message: authTypes().AUTH_LOGIN_SUCCESSFULLY.message,
            } 
        } catch (error) {
            return {
                data: [authTypes().AUTH_TOKEN_ERROR],
                error: error.message
            }
        }
    }

    @Auth()
    @Get('profile')
    profile(
        @User() user: UserDto,
        @Req() _req: any
    ): Resp {
        return {
            data: [UserDto.plainToClass(user)],
        }
    }

    @Auth()
    @Get('refresh')
    refreshToken(
        @User() user: UserDto
    ): Resp {
        console.log(user);
        const data = this.authService.login(user);
        return {
            data: [data],
            message: authTypes().AUTH_REFRESH_SUCCESSFULLY.message,
        }
    }
}