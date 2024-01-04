import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { categories as CategoriesNew } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.createCategory(createCategoryDto);
  }

  @Get()
  findAll() {
    return this.categoriesService.findAllCategories();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.categoriesService.findOneCategory(id);
  // }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoriesService.updateCategory(id, updateCategoryDto);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.categoriesService.removeCategory(+id);
  // }
}
