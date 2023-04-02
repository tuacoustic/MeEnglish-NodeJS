import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { TestModule } from '../src/test/test.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TestEntity } from '../src/test/test.entity';
import { AccessControlModule } from 'nest-access-control';
import { roles } from '../src/app.roles';

describe('TestController (e2e)', () => {
  let app: INestApplication;
  
  const mockTestRepository = {
    find: jest.fn().mockResolvedValue({}),
    create: jest.fn().mockImplementation(dto => dto),
    save: jest.fn().mockImplementation(test => Promise.resolve({
      id: Date.now(),
      ...test,
    }))
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [TestModule, AccessControlModule.forRoles(roles)]
    })
    .overrideProvider(getRepositoryToken(TestEntity))
    .useValue(mockTestRepository)
    .compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe())
    await app.init();
  });

  it('/test (POST)', async () => {
    return request(app.getHttpServer())
    .post('/test')
    .send({
      name: 'Fake User'
    })
    .expect('Content-Type', /json/)
    .expect(201)
    .then(res => {
      expect(res.body.data).toEqual([{
        id: expect.any(Number),
        name: 'Fake User',
      }])
    })
  })

  it('/test (POST) --> 400 on validation error', async () => {
    return request(app.getHttpServer())
    .post('/test')
    .send({
      name: 123456789
    })
    .expect('Content-Type', /json/)
    .expect(400, {
      statusCode: 400,
      message: ['name must be a string'],
      error: 'Bad Request',
    })
  })
});
