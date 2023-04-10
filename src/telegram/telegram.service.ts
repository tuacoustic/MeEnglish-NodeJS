import { Injectable } from '@nestjs/common';
import TelegramBot from 'node-telegram-bot-api';
import { telegramSendWelcome, welcomeKeyboard } from './telegram.constant';
import { TelegramUsersEntity } from './entities/telegram-users.entity';
import { Repository } from 'typeorm';
import { RedisService } from 'src/common/redis/redis.service';
import { AddTelegramUsersDto } from './dtos/addTelegramUsers.dto';
import { InjectRepository } from '@nestjs/typeorm';
@Injectable()
export class TelegramService {
    constructor(
        @InjectRepository(TelegramUsersEntity) 
        private telegramUsersRepo: Repository<TelegramUsersEntity>,
        private readonly redisService: RedisService,
    )   
    {}
    
    telegramWebhook() {
        const token = '5945889468:AAFs0oc4QU2rvwIJoa_alt3m8umvFDvlfiQ';
        const bot = new TelegramBot(token, {polling: true})
        bot.on('message', async (msg) => {
            const chatId = msg.chat.id;
            const username = msg.chat.username;
            const fullName = msg.chat.first_name && msg.chat.last_name ? `${msg.chat.first_name} ${msg.chat.last_name}` : username;
            const message = msg.text.toLocaleLowerCase();
            switch(message){
                case "/start" || "start":
                    // Check user existed
                    const checkStatus = await this.checkTelegramUser(chatId);
                    if (checkStatus) {
                        const text = `Welcome back *${fullName}*, continuing your studies 💪`
                        bot.sendMessage(chatId, text, {
                            parse_mode: 'Markdown',
                        });
                        break;
                    }
                    const user: AddTelegramUsersDto = {
                        telegramId: chatId.toString(),
                        username,
                        firstname: msg.chat.first_name ? msg.chat.first_name : '',
                        lastname: msg.chat.last_name ? msg.chat.last_name : ''
                    }
                    const registerUser = await this.telegramRegisterUser(user)
                    if (!registerUser) {
                        const text = `*${fullName}*, You was unable to log in successfully. Please try again in 5 minutes 😭`
                        bot.sendMessage(chatId, text, {
                            parse_mode: 'Markdown',
                        });
                        break;
                    }
                    const getText = telegramSendWelcome(fullName);
                    bot.sendMessage(chatId, getText, {
                        ...welcomeKeyboard,
                        parse_mode: 'Markdown',
                    });
                    break;
                case "study now" || "studynow":
                    bot.sendMessage(chatId, "Study now")
                    break;
                case "vocabulary groups" || "vocabularygroups":
                    bot.sendMessage(chatId, "Vocabulary groups")
                    break;
                case "support" || "sp":
                    bot.sendMessage(chatId, "Support")
                    break;
                case "join our team" || "joinourteam" || "joinour tean" || "join ourteam":
                    bot.sendMessage(chatId, "Join our team")
                    break;
                case "buy me a coffee" || "buyme a coffee" || "buymea coffee" || "buy meacoffee" || "buy me acoffee" || "buyme acoffee":
                    bot.sendMessage(chatId, "Buy me a coffee")
                    break;
            }
        });
    }

    async telegramRegisterUser(dto: AddTelegramUsersDto): Promise<boolean>{
        // Register telegram_users
        const saveData = await this.telegramUsersRepo.save(dto)
        if (!saveData) {
            return false;
        }
        const key = `telegram_user_id:${dto.telegramId}`;
        this.redisService.set({
            key,
            value: dto.telegramId,
            expired: 604800 // 7 days
        })
        return true;
    }

    async checkTelegramUser(sub: number): Promise<boolean>{
        const id = sub.toString();
        // Check telegram_users
        const key = `telegram_user_id:${sub}`;
        const getValue = await this.redisService.get(key);
        if (!getValue) {
            // return false;
            const getDataFromDb = await this.telegramUsersRepo.findOne({
                where: {
                    telegramId: id,
                },
                select: {
                    telegramId: true,
                }
            })
            if(!getDataFromDb) {
                return false;
            }
            this.redisService.set({
                key,
                value: id,
                expired: 604800 // 7 days
            })
            return true;
        }
        return true;
    }
}
