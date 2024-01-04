import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  Query,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('categories')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post(':categoryId')
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.createProduct(createProductDto);
  }

  @Get(':categoryId')
  findAll(
    @Param('categoryId') categoryId: string,
    @Query('size') size: string,
    @Query('page') page: number,
  ) {
    return this.productService.findAll(categoryId, size, page);
  }

  @Get(':id/Products/:id')
  findProductInfo(@Param('id') id: string) {
    return this.productService.findProductInfo(id);
  }

  @Patch(':id/Products/:id')
  update(@Param('id') id: string, @Body() UpdateProductDto: UpdateProductDto) {
    return this.productService.update(id, UpdateProductDto);
  }

  @Put(':id/Products/:id')
  updateAll(
    @Param('id') id: string,
    @Body() UpdateProductDto: UpdateProductDto,
  ) {
    return this.productService.update(id, UpdateProductDto);
  }

  @Delete('Products/:categoryId')
  remove(@Param('categoryId') categoryId: string) {
    return this.productService.remove(categoryId);
  }
}
