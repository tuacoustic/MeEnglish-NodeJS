import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { testStubArray } from './stubs/test.stub';
import { TestEntity } from './test.entity';
import { TestService } from './test.service';
import { mockTestServiceRepo } from './__mocks__/test.service';

describe('TestService', () => {
  let service: TestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TestService, {
        provide: getRepositoryToken(TestEntity),
        useValue: mockTestServiceRepo,
      }],
    }).compile();

    service = module.get<TestService>(TestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new test records and return that', async () => {
    expect(await service.create({ name: 'Fake Data' })).toEqual({
      id: expect.any(Number),
      name: 'Fake Data',
    })
  })

  it('should get a list test records', async () => {
    const dto = testStubArray()
    const getData = await service.list();
    expect(getData).toEqual(dto);
  })
});
