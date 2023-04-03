import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { VocabularyDetailsEntity } from "./vocabulary-details.entity";
import { VocabularyDetailsController } from "./vocabulary-details.controller";
import { VocabularyDetailsService } from "./vocabulary-details.service";
// import { VocabularyModule } from "src/vocabulary/vocabulary.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([VocabularyDetailsEntity]),
        // VocabularyModule
    ],
    controllers: [VocabularyDetailsController],
    providers: [VocabularyDetailsService],
    exports: [VocabularyDetailsService],
})
export class VocabularyDetailsModule {}