import { Test, TestingModule } from '@nestjs/testing';
import { TestController } from './test.controller';
import { TestService } from './test.service';
import { mockTestControllerRepo } from './__mocks__/test.controller';
import { expectedStub, testStub, testStubArray } from './stubs/test.stub';
import { RolesBuilder } from 'nest-access-control';

describe('TestController', () => {
  let controller: TestController;
  const roles: RolesBuilder = new RolesBuilder();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TestController],
      providers: [
        TestService,
        {
          provide: TestService,
          useValue: mockTestControllerRepo
        },
        {
          provide: '__roles_builder__',
          useValue: roles
        }
      ],
    })
      .compile();

    controller = module.get<TestController>(TestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a test', async () => {
    const dto = testStub();
    const createdData = await controller.create(dto);
    const expectedData = expectedStub();
    expect(expectedData).toEqual(createdData.data);
    expect(mockTestControllerRepo.create).toHaveBeenCalled();
  })

  it('should update a test', async () => {
    const dto = testStub();
    const updatedData = await controller.update(dto.id, dto)
    const expectedData = expectedStub();
    expect(expectedData).toEqual(updatedData.data);
    expect(mockTestControllerRepo.update).toHaveBeenCalled();
  })

  it('should getAll test', async () => {
    const dto = testStubArray();
    const getData = await controller.list();
    expect(getData.data).toEqual(dto);
    expect(mockTestControllerRepo.list).toHaveBeenCalled();
  })
});
