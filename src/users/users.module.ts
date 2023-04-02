import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RedisService } from "../common/redis/redis.service";
import { UsersController } from "./users.controller";
import { UserEntity } from "./users.entity";
import { UserService } from "./users.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity]),
    ],
    controllers: [UsersController],
    providers: [UserService, RedisService],
    exports: [UserService],
})
export class UserModule {}
