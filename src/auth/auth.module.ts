import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { CryptoService } from '../common/crypto/crypto.service';
import { RedisService } from '../common/redis/redis.service';
import { LoggerService } from '../logger/logger.service';
import { UserModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy, JwtStrategy } from './strategies';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({}),
    UserModule
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, RedisService, LoggerService, CryptoService],
  controllers: [AuthController]
})
export class AuthModule {}
