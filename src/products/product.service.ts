import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async createProduct(createProductDto: CreateProductDto) {
    const {
      name,
      price,
      isFavorited,
      description,
      image,
      discountPercentage,
      categoryId,
      variations,
    } = createProductDto;

    const newProduct = await this.prisma.product.create({
      data: {
        name,
        price,
        isFavorited,
        description,
        image,
        discountPercentage,
        category: {
          connect: {
            id: categoryId,
          },
        },
        variations: {
          create: variations.map((variation) => ({
            name: variation.name,
            options: {
              create: variation.options.map((option) => ({
                value: option.value,
                description: option.description,
              })),
            },
          })),
        },
      },
      include: {
        variations: true,
      },
    });

    return newProduct;
  }

  async findAll(categoryId: string, size?: string, page?: number) {
    if (size === undefined) {
      return this.prisma.product.findMany({
        skip: page,
        take: 1,
        where: { categoryId },
      });
    } else {
      try {
        return await this.prisma.product.findMany({
          skip: page,
          take: 3,
          include: {
            variations: {
              include: {
                options: {
                  where: {
                    value: size,
                  },
                },
              },
            },
          },
        });
      } catch (error) {
        throw new NotFoundException();
      }
    }
  }

  async findProductInfo(id: string) {
    return this.prisma.product.findUnique({
      where: { id },
      include: {
        variations: {
          include: {
            options: true,
          },
        },
      },
    });
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const {
      name,
      price,
      isFavorited,
      description,
      image,
      discountPercentage,
      categoryId,
      variations,
    } = updateProductDto;

    const updatedProduct = await this.prisma.product.update({
      where: { id },
      data: {
        name,
        price,
        isFavorited,
        description,
        image,
        discountPercentage,
        variations: {
          deleteMany: {}, // Remove existing variations
          create: (variations ?? []).map((variation) => ({
            name: variation.name,
            options: {
              create: variation.options.map((option) => ({
                value: option.value,
                description: option.description,
              })),
            },
          })),
        },
      },
      include: {
        variations: true,
      },
    });

    return updatedProduct;
  }

  async remove(id: string) {
    try {
      const deleteObj = await this.prisma.product.delete({
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
