import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseService } from "../common/mysql/base.service";
import { Repository } from "typeorm";
import { UserDto } from "./dtos";
import { UserEntity } from "./users.entity";

@Injectable()
export class UserService extends BaseService<UserEntity> {
    constructor(
        @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
    ) {
        super(userRepository)
    }
    async createOne(dto: UserDto): Promise<UserDto> {
        const newUser = this.userRepository.create(dto);
        const user = await this.userRepository.save(newUser);
        return user;
    }
}