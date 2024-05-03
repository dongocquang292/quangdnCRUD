import { Body, Controller, Get, Patch, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { Response } from 'express';
import { GetAuthor } from './decorators';
import { AuthorService } from './author.service';
import { AuthorDto } from './dto/author-dto';

@Controller('author')
export class AuthorController {
  constructor(private authorService: AuthorService) {}

  @UseGuards(AuthGuard)
  @Get('/me')
  async getMe(
    @GetAuthor() author,
    @Res() res: Response,
  ): Promise<Response<any, Record<string, any>>> {
    const current_author = author;
    delete current_author.exp;
    delete current_author.iat;

    return res.status(200).send({
      statusCode: 200,
      message: 'Data fetched successfully',
      author: current_author,
    });
  }

  @UseGuards(AuthGuard)
  @Patch('/update/me')
  async updateMe(
    @GetAuthor('id') id: number,
    @Body() authorDto: AuthorDto,
    @Res() res: Response,
  ): Promise<Response<any, Record<string, any>>> {
    const updated_author = await this.authorService.update(authorDto, id);
    return res.status(200).send({
      success: true,
      message: 'Profile updated successfully',
      author: updated_author,
    });
  }
}
