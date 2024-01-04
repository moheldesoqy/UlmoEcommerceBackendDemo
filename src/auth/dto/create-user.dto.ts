import { IsNotEmpty, ValidateNested } from "class-validator";

export class CreateUserDto {

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    password: string;

  }