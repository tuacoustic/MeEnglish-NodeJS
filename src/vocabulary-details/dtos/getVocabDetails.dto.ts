import { Expose } from "class-transformer";
import { BaseDto } from "src/common/base.dto";

export class GetVocabDetailDto extends BaseDto {
    @Expose()
    shortDesc: string;

    @Expose()
    meaning: string;
    
    @Expose()
    level: string;

    @Expose()
    examples: string[];
}