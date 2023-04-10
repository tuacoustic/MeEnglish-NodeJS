import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('telegram_users')
export class TelegramUsersEntity extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({
        type: String,
        name: "telegram_id"
    })
    telegramId: string

    @Column({
        type: String,
        name: "username"
    })
    username: string

    @Column({
        type: String,
        name: "firstname"
    })
    firstname: string

    @Column({
        type: String,
        name: "lastname"
    })
    lastname: string

    @Column({
        type: String,
        name: "type"
    })
    type: string

    @Column({
        default: false,
    })
    isActive: boolean
}