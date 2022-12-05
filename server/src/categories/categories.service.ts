import { CreateCategoryDto } from './dto/create-category.dto';
import { Category } from '../typeorm/category.entity';
import { Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}
  async create(createCategoryDto: CreateCategoryDto) {
    await this.categoryRepository
      .createQueryBuilder()
      .insert()
      .into(Category)
      .values(createCategoryDto)
      .execute();
  }
  async findAll() {
    return this.categoryRepository.find();
  }
  async findOneAndUpdate(id: number, createCategoryDto: CreateCategoryDto) {
    const category = await this.categoryRepository.findOne({ where: { id } });

    if (!category) {
      throw new NotFoundException(`Not found category with id: ${id}`);
    }

    await this.categoryRepository
      .createQueryBuilder()
      .update()
      .set(createCategoryDto)
      .where('id=:id', { id: id })
      .execute();
  }
}
