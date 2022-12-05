import {
  IsEnum,
  IsNotEmpty,
  IsNumberString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { extname } from 'path';
import { Categories } from 'src/typeorm/category.entity';

export class CreateProductDto {
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(20)
  name: string;

  @IsNotEmpty()
  @IsNumberString()
  @MinLength(1)
  @MaxLength(10)
  price: string;

  @IsNotEmpty()
  @IsNumberString()
  @MinLength(1)
  @MaxLength(5)
  inventory: string;

  createAt: Date;

  updateAt: Date;

  @IsNotEmpty()
  @IsEnum(Categories)
  categories: Categories;

  @IsNotEmpty()
  @MaxLength(400)
  @MinLength(15)
  description: string;

  @IsNotEmpty()
  imgUrl: string;
}
