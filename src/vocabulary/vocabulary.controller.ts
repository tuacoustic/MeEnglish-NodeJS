import { Body, Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { vocabularyTypes } from "../../src/common/code-type/vocabulary.code-type";
// import { Resp } from "../../src/common/resp";
import { GetVocabDto } from "./dtos";
import { VocabularyService } from "./vocabulary.service";

@ApiTags('Vocabulary API')
@Controller('vocabulary')
export class VocabularyController {
    constructor(
        private readonly vocabService: VocabularyService,
    ) {}
    @Get('/oxford/get')
    async getOxfordVocab(
        @Body() vocabDto: GetVocabDto, 
    ): Promise<any> {
        try {
            await this.vocabService.getDataFromUrl(vocabDto);
        } catch (error) {
            return {
                data: [vocabularyTypes().VOCAB_GET_FAILED],
                error: error.message
            }
        }
    }
}

