import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SigninDTO, SignupDTO } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { JwtService } from '@nestjs/jwt';

@Injectable({})
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(body: SigninDTO) {
    try {
      const current_author = await this.prisma.author.findUniqueOrThrow({
        where: {
          email: body.email,
        },
      });

      const pwdMatches = await argon.verify(
        current_author.password,
        body.password,
      );

      if (!pwdMatches) {
        throw new BadRequestException('Bad Credentials');
      }

      delete current_author.password;

      const payload = {
        id: current_author.id,
        fullname: current_author.fullname,
        email: current_author.email,
      };

      return {
        token: await this.jwtService.signAsync(payload),
      };

    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new BadRequestException('Bad credentials');
        }
      }
      throw error;
    }
  }

  async signUp(body: SignupDTO) {
    try {
      const password: string = await argon.hash(body.password);
      const saved_author = await this.prisma.author.create({
        data: {
          email: body.email,
          password,
          fullname: body.fullname,
        },
      });
      delete saved_author.password;
      return saved_author;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials taken');
        }
      }
      throw error;
    }
  }
}
