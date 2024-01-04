import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { jwtConstants } from './constants';
import { JwtModule } from '@nestjs/jwt/dist';
import { PrismaService } from '../prisma.service';
import { UsersService } from '../users/users.service';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    UsersModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get("PORT"),
      })

    }),
    UsersModule
  ],
  controllers: [AuthController],
  providers: [AuthService, PrismaService, UsersService]
})
export class AuthModule {}
