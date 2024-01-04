import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriesModule } from './categories/categories.module';
import { CategoriesController } from './categories/categories.controller';
import { CategoriesService } from './categories/categories.service';
import { PrismaService } from './prisma.service';
import { ProductModule } from './products/product.module';
import { ProductController } from './products/product.controller';
import { ProductService } from './products/product.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AuthService } from './auth/auth.service';
import { UsersService } from './users/users.service';
import { AuthController } from './auth/auth.controller';
import { UsersController } from './users/users.controller';
import { ConfigModule } from '@nestjs/config';
import { configuration } from './configuration/config';
import { JwtModule } from '@nestjs/jwt';

console.log(`The connection URL is ${process.env.DATABASE_URL}`);

@Module({
  imports: [
    JwtModule,
    CategoriesModule,
    ProductModule,
    AuthModule,
    UsersModule,
    ConfigModule.forRoot({
      envFilePath: `src/configuration/env/${process.env.NODE_ENV}.env`,
      load: [configuration],
      isGlobal: true,
    }),
  ],
  controllers: [
    AppController,
    CategoriesController,
    ProductController,
    AuthController,
    UsersController,
  ],
  providers: [
    AppService,
    CategoriesService,
    ProductService,
    PrismaService,
    AuthService,
    UsersService,
  ],
})
export class AppModule {}
