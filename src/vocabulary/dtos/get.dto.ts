import { IsNotEmpty } from "class-validator";

export class GetVocabDto {
    @IsNotEmpty()
    url: string;
}