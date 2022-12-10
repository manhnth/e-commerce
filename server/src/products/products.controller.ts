import { UpdateProductDto } from './dto/update-product.dto';
import { CreateProductDto } from './dto/create-product.dto';
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private productService: ProductsService) {}

  @Post('create')
  async createProduct(@Body() createProductDto: CreateProductDto) {
    return await this.productService.createProduct(createProductDto);
  }

  @Get('all')
  async fetchProducts() {
    return this.productService.fetchProducts();
  }

  @Get('findByCategory')
  async fetchProductsByCategory(@Query() query: string) {
    return await this.productService.fetchProductsByCategory(query);
  }

  @Get(':id')
  async getProductById(@Param('id') id: number) {
    const product = await this.productService.getProductById(id);

    if (!product) {
      throw new BadRequestException(`Product with id: ${id} not found`);
    }
    return product;
  }

  @Patch('update/:id')
  async updateProduct(
    @Param('id') id: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    const product = await this.productService.getProductById(id);

    if (!product) {
      throw new BadRequestException(`Product with id: ${id} not found`);
    }

    await this.productService.updateProduct(updateProductDto, product);

    return { message: 'Update Success!' };
  }

  @Delete(':id')
  async removeById(@Param('id') id: number) {
    const product = this.productService.getProductById(id);

    if (!product) {
      throw new BadRequestException(`Product with id: ${id} not found`);
    }

    await this.productService.removeOne(id);

    return { message: 'Delete Success', status: HttpStatus.OK };
  }
}
