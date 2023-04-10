import { Body, Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { vocabularyTypes } from "../../src/common/code-type/vocabulary.code-type";
// import { Resp } from "../../src/common/resp";
import { AddVocabDto } from "./dtos";
import { GetDataFrService, VocabularyService } from "./vocabulary.service";

@ApiTags('Vocabulary API')
@Controller('vocabulary')
export class VocabularyController {
    constructor(
        private readonly vocabService: VocabularyService,
    ) {}
    @Get('/oxford/get')
    async getOxfordVocab(
        @Body() vocabDto: AddVocabDto, 
    ): Promise<any> {
        try {
            const data: GetDataFrService = await this.vocabService.getDataFromUrl(vocabDto);
            if(!data.status) {
                const { word } = data.data;
                return {
                    data: [vocabularyTypes("",word).VOCAB_EXISTED],
                }
            }
            return data;
        } catch (error) {
            return {
                data: [vocabularyTypes().VOCAB_GET_FAILED],
                error: error.message
            }
        }
    }
    @Get('/get')
    async getVocab(): Promise<any> {
        const data = await this.vocabService.getAllWithRelation();
        return data;
    }
}

