import { IsNotEmpty, ValidateNested } from "class-validator";

export class CreateCategoryDto {

    @IsNotEmpty()
    name: string;
    @IsNotEmpty()
    image: string;
  }