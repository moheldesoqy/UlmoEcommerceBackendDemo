import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma.service';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private usersService: UsersService,
        private jwtService: JwtService
      ) {}
    
      async signIn(username, pass) {
        const user = await this.usersService.findOne(username);
        if (user?.password !== pass) {
          throw new UnauthorizedException();
        }
        const payload = { sub: user.id, username: user.name };
        return {
          access_token: await this.jwtService.signAsync(payload),
        };
      }
    
    }
    
    
    
    
