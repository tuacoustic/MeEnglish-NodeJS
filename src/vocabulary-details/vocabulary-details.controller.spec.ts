import { Test, TestingModule } from '@nestjs/testing';
import { VocabularyDetailsController } from './vocabulary-details.controller';

describe('VocabularyDetailsController', () => {
  let controller: VocabularyDetailsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VocabularyDetailsController],
    }).compile();

    controller = module.get<VocabularyDetailsController>(VocabularyDetailsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
