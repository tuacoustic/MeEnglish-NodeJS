import { BaseEntity } from "../common/mysql/base.entity";
import { UserEntity } from "../users/users.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('posts')
export class PostEntity extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({ type: 'text', nullable: false })
    slug!: string;
  
    @Column({ type: 'varchar', length: 150 })
    title!: string;
  
    @Column({ type: 'varchar', length: 255 })
    excerpt?: string;
  
    @Column({ type: 'text' })
    content!: string;
  
    @Column({ type: 'varchar', length: 100, nullable: true })
    category: string;
  
    @Column({ type: 'simple-array' })
    tags: string[];
  
    @Column({ type: 'bool', default: true })
    status: boolean;

    @ManyToOne(
        () => UserEntity,
        user => user.posts,
        { eager: true },
    )
    @JoinColumn({ name: 'author_id' })
    author: UserEntity;
}