import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/common/mysql/base.service';
import { VocabularyDetailsEntity } from './vocabulary-details.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class VocabularyDetailsService extends BaseService<VocabularyDetailsEntity> {
    constructor(
        @InjectRepository(VocabularyDetailsEntity) vocabDetailsRepo: Repository<VocabularyDetailsEntity>
    ) {
        super(vocabDetailsRepo) 
    }
}
