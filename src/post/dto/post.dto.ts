import { IsNotEmpty, IsString, IsArray, IsBoolean } from 'class-validator';
import { isString } from 'util';
import { TagDto } from './tag.dto';
import { Tag } from '../entity/tag.entity';

export class PostDto {
  @IsNotEmpty()
  @IsString()
  title: string;
  @IsArray()
  tags: Tag[];
  @IsNotEmpty()
  @IsString()
  content: string;

  @IsString() status: string;
  @IsBoolean() allowComments: boolean;
}
