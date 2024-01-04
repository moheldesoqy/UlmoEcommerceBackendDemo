import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { IsNotEmpty } from 'class-validator';

export class UpdateProductDto extends PartialType(CreateProductDto) {
    @IsNotEmpty()
    name: string

    @IsNotEmpty()
    price: string

    @IsNotEmpty()
    currency: string

    @IsNotEmpty()
    isFavorited: boolean;

    @IsNotEmpty()
    description: string

    @IsNotEmpty()
    image: string

    @IsNotEmpty()
    discountPercentage: string
}
