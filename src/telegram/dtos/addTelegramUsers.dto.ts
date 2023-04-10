import { Expose } from "class-transformer";

export class AddTelegramUsersDto {
    @Expose()
    telegramId: string

    @Expose()
    username: string

    @Expose()
    firstname: string

    @Expose()
    lastname: string
}