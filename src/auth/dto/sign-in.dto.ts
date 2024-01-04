import { IsNotEmpty, ValidateNested } from "class-validator";

export class SignInDto {

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    password: string;

  }