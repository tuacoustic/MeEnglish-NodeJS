import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PostsController } from "./posts.controller";
import { PostEntity } from "./posts.entity";
import { PostService } from "./posts.service";

@Module({
    imports:[
        TypeOrmModule.forFeature([PostEntity])
    ],
    controllers: [PostsController],
    providers: [PostService],
    exports: [PostService]
})
export class PostModule {}