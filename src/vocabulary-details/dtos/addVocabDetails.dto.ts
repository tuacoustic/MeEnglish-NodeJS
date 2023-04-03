import { Expose } from "class-transformer";
import { BaseDto } from "src/common/base.dto";

export class AddVocabDetails extends BaseDto{
    @Expose()
    meaning: string;

    @Expose()
    examples: string[];

    @Expose()
    word: string;
}