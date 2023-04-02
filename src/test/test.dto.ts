import { IsString } from "class-validator";

export class TestDto {
    id?: string;
    @IsString()
    name: string;
}