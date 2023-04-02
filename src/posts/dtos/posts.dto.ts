import { IsArray, IsBoolean, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { EnumToString } from '../../common/helpers/enumToString';
import { PostCategory } from '../posts.enum';
  
export class CreatePostDto {
    @IsString()
    title: string;
  
    @IsString()
    slug: string;
  
    @IsString()
    excerpt: string;
  
    @IsString()
    content: string;
  
    @IsNotEmpty()
    @IsEnum(PostCategory, {
      message: `category is invalid. Valids options are ${EnumToString(PostCategory)}`,
    })
    category: string;
  
    @IsString({ each: true })
    @IsArray()
    tags: string[];
  
    @IsOptional()
    @IsBoolean()
    status: boolean;
}
  