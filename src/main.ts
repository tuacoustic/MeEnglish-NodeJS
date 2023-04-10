import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { initSwagger } from './app.swagger';
import configuration from './config/configuration';

declare const module: any;
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Validation Handlers
  // app.useGlobalPipes(new ValidationPipe({
  //   exceptionFactory: (validationError: ValidationError[] = []) => {
  //     const errMsg = ObjToArray(validationError[0].constraints);
  //     return new BadRequestException({
  //       status: HttpStatus.BAD_REQUEST,
  //       data: [
  //         {
  //           code: validationTypes().VALIDATION_ERROR.error_code,
  //           message: errMsg,
  //         }
  //       ]
  //     })
  //   }
  // }))
  app.useGlobalPipes(new ValidationPipe())

  // Cookie-parser
  app.use(cookieParser());

  // Swagger
  initSwagger(app);
  const config = configuration();

  // Enable Cors
  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
  });
  
  // Telegram
  // const telegramWebhook = new TelegramService();
  // telegramWebhook.telegramWebhook()

  await app.listen(config.port, () => {
    console.log(`App is running on port ${config.port}`);
  })

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
