import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { TYPEORM_CONFIG } from './config/constants';
import databaseConfig from './config/mysql/database.config';
import { UserModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AccessControlModule } from 'nest-access-control';
import { roles } from './app.roles';
import { PostModule } from './posts/posts.module';
import { TestModule } from './test/test.module';
import { VocabularyModule } from './vocabulary/vocabulary.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => config.get<TypeOrmModuleOptions>(TYPEORM_CONFIG),
    }),
    // TypeOrmModule.forRoot(dataSourceOptions),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.development.local', '.env.development'],
      ignoreEnvFile: false, // Use export on OS shell only
      load: [databaseConfig]
    }),
    AccessControlModule.forRoles(roles),
    UserModule,
    AuthModule,
    PostModule,
    TestModule,
    VocabularyModule,
  ],
})
export class AppModule {}
