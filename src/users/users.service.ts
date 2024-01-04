import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma.service';
import { Users } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  create(createUserDto: CreateUserDto) {
    const { name, password } = createUserDto;
    const newUser = this.prisma.users.create({
      data: {
        name,
        password,
      },
    });
    return newUser;
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(name: string) {
    return this.prisma.users.findFirst({
      where: { name },
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
