import { Module } from "@nestjs/common";
import { VocabularyController } from "./vocabulary.controller";
import { VocabularyService } from "./vocabulary.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { VocabularyEntity } from "./vocabulary.entity";
// import { VocabularyDetailsService } from "src/vocabulary-details/vocabulary-details.service";
import { VocabularyDetailsModule } from "../../src/vocabulary-details/vocabulaty-details.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([VocabularyEntity]),
        VocabularyDetailsModule
    ],
    controllers: [VocabularyController],
    providers: [VocabularyService]
})
export class VocabularyModule {}