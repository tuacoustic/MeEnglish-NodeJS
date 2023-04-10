import { IsArray, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class AddVocabDto {
    @IsNotEmpty()
    @IsString()
    url: string;

    @IsNotEmpty()
    @IsArray()
    relatedWords: string[]; 

    @IsNotEmpty()
    @IsString()
    imageUrl: string;

    @IsNotEmpty()
    @IsNumber()
    groupNumber: Number;
}