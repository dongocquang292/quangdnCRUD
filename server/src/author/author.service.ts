import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuthorDto } from './dto/author-dto';
import * as argon from 'argon2';

@Injectable()
export class AuthorService {
  constructor(private readonly prismaService: PrismaService) {}

  async update(authorDto: AuthorDto, id: any) {
    try {
      const current_author = await this.prismaService.author.findUnique({
        where: {
          id,
        },
      });

      const fullname = authorDto.fullname;
      let password;
      if (authorDto.old_password) {
        if (authorDto.new_password === authorDto.confirm_password) {
          const is_matched = await argon.verify(
            current_author.password,
            authorDto.old_password,
          );

          if (is_matched) {
            password = await argon.hash(authorDto.new_password!);
          } else {
            throw new BadRequestException('Verify your password');
          }
        } else {
          throw new BadRequestException(
            `Password and Confirm password doesn't match`,
          );
        }
      }
      
      const updated_author = await this.prismaService.author.update({
        where: {
          id,
        },
        data: {
          fullname,
          password,
        },
      });

      delete updated_author.password;

      return updated_author;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
