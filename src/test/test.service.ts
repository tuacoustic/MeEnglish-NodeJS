import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from '../common/mysql/base.service';
import { Repository } from 'typeorm';
import { TestDto } from './test.dto';
import { TestEntity } from './test.entity';

@Injectable()
export class TestService extends BaseService<TestEntity>{
    constructor(
        @InjectRepository(TestEntity)
        private testRepository: Repository<TestEntity>
    ) {
        super(testRepository)
    }

    list(): Promise<TestEntity[]> {
        return this.testRepository.find();
    }

    create(dto: TestDto): Promise<TestDto> {
        return this.testRepository.save(dto);
    }
}
