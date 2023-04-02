import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseService } from "../common/mysql/base.service";
import { Repository } from "typeorm";
import { PostEntity } from "./posts.entity";


@Injectable()
export class PostService extends BaseService<PostEntity> {
    constructor(
        @InjectRepository(PostEntity) postRepo: Repository<PostEntity>,
    ) {
        super(postRepo)
    }
}