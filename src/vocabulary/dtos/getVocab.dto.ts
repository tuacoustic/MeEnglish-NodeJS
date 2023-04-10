import { Expose } from "class-transformer";
import { BaseDto } from "src/common/base.dto";

export class GetVocabDto extends BaseDto {
    @Expose()
    word: string;

    @Expose()
    audioUrl: string;
    
    @Expose()
    imageUrl: string;

    @Expose()
    groupNumber: number;

    @Expose()
    wordType: string;

    @Expose()
    nounType: string;

    @Expose()
    synonyms: string[];

    @Expose()
    relatedWords: string[];
}