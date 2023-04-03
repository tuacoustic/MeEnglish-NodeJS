import { IsArray, IsNotEmpty, IsNumber, IsObject, IsString } from "class-validator";

export class AddVocabDto {
    @IsNotEmpty()
    @IsString()
    url: string;

    @IsNotEmpty()
    @IsObject()
    examples: object;

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