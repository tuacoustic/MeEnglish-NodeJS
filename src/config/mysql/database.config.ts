import { registerAs } from "@nestjs/config";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";

function typeOrmModuleOptions(): TypeOrmModuleOptions{
    return {
        type: "mysql",
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT, 10),
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        // logging: "all",
        synchronize: false, // Setting synchronize: true shouldn't be used in production - otherwise you can lose production data.
        autoLoadEntities: true,

        // Implement Migrations
        /** Recursos
         * https://typeorm.io/#/migrations
        */
        // migrationsRun: true,
        // migrations: [join(__dirname, '../../config/mysql/migration/*{.ts,.js}')],
        // migrationsTableName: "migrations_typeorm",
        // migrations: [
        //         "src/config/mysql/migrations/*.ts",
        //         "dist/config/mysql/migrations/*{.ts,.js}"
        // ],
    }
}

export default registerAs('database', () => ({
    config: typeOrmModuleOptions()
}));