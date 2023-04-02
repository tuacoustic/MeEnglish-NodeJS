import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(404)
      // .expect('Hello World!');
  });

  // Login in as ADMIN
  describe('if user is logged in as (ADMIN)', () => {
    let jwtToken: string;
    beforeEach(async () => {
      const res = await request(app.getHttpServer())
        .post('/auth/login')
        .send({ email: 'tudinhacoustic@gmail.com', password: 'abc' });
      
      expect(res.status).toEqual(201);
      jwtToken = res.body.data[0].accessToken;
    })

    it('/test (GET)', async () => {
      const res = await request(app.getHttpServer())
        .get('/test')
        .set('Authorization', 'Bearer ' + jwtToken);
      expect(res.status).toEqual(200)
    })
  })
});
