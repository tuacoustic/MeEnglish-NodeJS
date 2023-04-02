import { MigrationInterface, QueryRunner } from "typeorm"

export class initialState1678673901834 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `posts` (`id` int NOT NULL AUTO_INCREMENT, `slug` text NOT NULL, `title` varchar(150) NOT NULL, `excerpt` varchar(255) NOT NULL, `content` text NOT NULL, `category` varchar(100) NULL, `tags` text NOT NULL, `status` tinyint NOT NULL DEFAULT 1, `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `author` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP TABLE `posts`");
    }

}
