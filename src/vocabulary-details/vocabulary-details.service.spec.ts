import { Test, TestingModule } from '@nestjs/testing';
import { VocabularyDetailsService } from './vocabulary-details.service';

describe('VocabularyDetailsService', () => {
  let service: VocabularyDetailsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VocabularyDetailsService],
    }).compile();

    service = module.get<VocabularyDetailsService>(VocabularyDetailsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
