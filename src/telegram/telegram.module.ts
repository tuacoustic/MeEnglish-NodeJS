import { Module } from '@nestjs/common';
import { TelegramService } from './telegram.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TelegramUsersEntity } from './entities/telegram-users.entity';
import { RedisService } from 'src/common/redis/redis.service';

@Module({
    // controllers: [TelegramService],
    imports: [
        TypeOrmModule.forFeature([TelegramUsersEntity])
    ],
    providers: [TelegramService, RedisService],
})
export class TelegramModule {}
