import { CreateCategoryDto } from './dto/create-category.dto';
import { CategoriesService } from './categories.service';
import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';

@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}
  @Get()
  async findAll() {
    const categories = await this.categoriesService.findAll();
    return { categories };
  }

  @Post('create')
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    try {
      return await this.categoriesService.create(createCategoryDto);
    } catch (error) {
      console.log(error);
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() createCategoryDto: CreateCategoryDto,
  ) {
    try {
      await this.categoriesService.findOneAndUpdate(id, createCategoryDto);
      return { status: 'success! Category updated' };
    } catch (error) {
      console.log(error);
    }
  }
}
