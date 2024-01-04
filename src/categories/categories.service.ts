import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from '../prisma.service';
import { categories } from '@prisma/client';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  async createCategory(createCategoryDto: CreateCategoryDto) {
    const { name, image } = createCategoryDto;

    const newCategory = await this.prisma.categories.create({
      data: {
        name,
        image,
        products: {
          // Create an empty product
        },
      },
      include: {
        products: true,
      },
    });

    return newCategory;
  }

  async findAllCategories() {
    return this.prisma.categories.findMany();
  }

  async findOneCategory(id: string) {
    const cat = this.prisma.categories.findUnique({
      where: { id },
    });
    return cat;
  }

  async updateCategory(id: string, updateCategoryDto: UpdateCategoryDto) {
    const { name, image } = updateCategoryDto;

    const updatedCategory = await this.prisma.categories.update({
      where: { id },
      data: {
        name,
        image,
      },
    });

    return updatedCategory;
  }

  async updateAllCategory(id: string, updateCategoryDto: UpdateCategoryDto) {
    const { name, image } = updateCategoryDto;

    const updatedCategory = await this.prisma.categories.update({
      where: { id },
      data: {
        name,
        image,
      },
    });

    return updatedCategory;
  }

  async removeCategory(id: string) {
    try {
      const deleteObj = await this.prisma.categories.delete({
        where: { id },
      });

      if (!deleteObj) {
        throw new NotFoundException();
      }
    } catch (error) {
      throw new NotFoundException();
    }
  }
}
