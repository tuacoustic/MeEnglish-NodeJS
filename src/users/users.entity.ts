import { BaseEntity } from "../common/mysql/base.entity";
import { BeforeInsert, BeforeUpdate, Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { hash } from 'bcryptjs';
import { PostEntity } from "../posts/posts.entity";

@Entity("users")
export class UserEntity extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({
        length: 30,
    })
    firstname: string

    @Column({
        length: 30,
    })
    lastname: string

    @Column({
        length: 30
    })
    phone: string

    @Column()
    email: string

    @Column({
        type: 'varchar',
        length: 128,
        nullable: false,
        select: false,
    })
    password: string
    
    @Column({
        default: false,
    })
    isActive: boolean

    @Column({
        type: 'simple-array'
    })
    roles: string[];

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword() {
        if (!this.password) {
            return;
        }
        this.password = await hash(this.password, 10)
    }

    @OneToOne(
        _ => PostEntity,
        post => post.author,
        { cascade: true }
    )
    posts: PostEntity;
}