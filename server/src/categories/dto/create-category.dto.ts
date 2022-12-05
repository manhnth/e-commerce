import {
  IsEnum,
  IsNotEmpty,
  IsNumberString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { extname } from 'path';
import { Categories } from 'src/typeorm/category.entity';

export class CreateCategoryDto {
  @IsNotEmpty()
  @IsEnum(Categories)
  name: Categories;

  @IsNotEmpty()
  imgUrl: string;

  @IsNotEmpty()
  description: string;
}
