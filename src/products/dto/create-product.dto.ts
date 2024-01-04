import { ArrayNotEmpty, IsArray, IsNotEmpty, isNotEmpty } from "class-validator"

export class CreateProductDto {
    @IsNotEmpty()
    name: string;
  
    @IsNotEmpty()
    price: string;
  
    isFavorited: boolean;
  
    @IsNotEmpty()
    description: string;
  
    @IsNotEmpty()
    image: string;
  
    @IsNotEmpty()
    discountPercentage: string;

    @IsNotEmpty()
    categoryId: string;
  
 
    variations?: VariationDto[];
  }
  
  export class VariationDto {
    @IsNotEmpty()
    name: string;
  
    @IsNotEmpty()
    options: OptionDto[];
  }
  
  export class OptionDto {
    @IsNotEmpty()
    value: string;
  
    @IsNotEmpty()
    description: string;
  }