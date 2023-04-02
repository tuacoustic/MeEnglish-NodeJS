import { Injectable } from '@nestjs/common';
import { UserDto } from '../users/dtos';
import { UserService } from '../users/users.service';
import { compare } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import configuration from '../config/configuration';
import { RedisService } from '../common/redis/redis.service';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { tokenLifeTime } from '../common/constant';
@Injectable()
export class AuthService extends PassportStrategy(Strategy) {

    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
        private readonly redisService: RedisService,
    ){
        super()
    }

    async validateUser(email: string, password: string): Promise<UserDto | null> {
        const where = {
            email,
        }
        const user = await this.userService.getOne(where, "email", "password", "id", "lastname", "firstname", "roles")
        if(user && await compare(password, user.password)) {
            return user;
        }
        return null;
    }

    async findUser(sub: string): Promise<UserDto | null> {
        console.log('sub', sub);
        const where = {
            id: sub,
        }
        const user = await this.userService.getOne(where, "id", "email", "lastname", "firstname", "roles")
        if(!user){
            return null;
        }
        return user;
    }

    login(user: UserDto) {
        const { id, email } = user;
        const payload = { sub: id, email };
        // Generate accesstoken
        const accessToken = this.signJWT(payload, tokenLifeTime.accessToken)
        const refreshToken = this.signJWT({ sub: id }, tokenLifeTime.refreshToken)
        const key = `RF_TOKEN:${id}`;
        this.redisService.set({
            key,
            value: refreshToken,
            expired: tokenLifeTime.redisRefreshToken,
        })
        return {
            user: UserDto.plainToClass(user),
            accessToken,
            refreshToken,
        }
    }

    signJWT(payload: object, expiresIn: string | number): string {
        const accessToken = this.jwtService.sign(payload, {
            secret: configuration().privateKey,
            algorithm: 'RS256',
            expiresIn,
        })
        return accessToken;
    }

    verify(token: string) {
        try {
            const decoded = this.jwtService.verify(token, {
                secret: configuration().publicKey
            });
            if (decoded == null) {
                return {
                    payload: null
                }
            }
            return {
                payload: decoded,
                expired: false,
            }
        } catch (error) {
            return {
                payload: null,
                error_message: error.message,
            }
        }
    }

    async getRfToken(sub: string): Promise<string> {
        const key = `RF_TOKEN:${sub}`;
        const getRfToken = await this.redisService.get(key);
        if (!getRfToken) {
            return null;
        }
        return getRfToken;
    }
}
