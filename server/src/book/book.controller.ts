import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { BookService } from './book.service';
import { GetAuthor } from '../author/decorators';
import { Response } from 'express';
import { AuthGuard } from '../auth/auth.guard';
import { BookDto } from './dto/book-dto';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @UseGuards(AuthGuard)
  @Post('create')
  async create(
    @GetAuthor('id') authorId: number,
    @Body() bookDto: BookDto,
    @Res() res: Response,
  ): Promise<Response<any, Record<string, any>>> {
    const new_book = await this.bookService.create(bookDto, authorId);
    return res.status(201).send({
      success: true,
      message: 'Book created successfully',
      book: new_book,
    });
  }

  @UseGuards(AuthGuard)
  @Patch('update')
  async update(
    @Body() bookDto: BookDto,
    @Res() res: Response,
  ): Promise<Response<any, Record<string, any>>> {
    const updated_book = await this.bookService.update(bookDto);
    return res.status(201).send({
      success: true,
      message: `Book id ${bookDto.id!} updated successfully!`,
      book: updated_book,
    });
  }

  @UseGuards(AuthGuard)
  @Get('find/:id')
  async findOne(
    @GetAuthor('id') authorId: number,
    @Param('id') id: number,
    @Res() res: Response,
  ): Promise<Response<any, Record<string, any>>> {
    
    const book = await this.bookService.findOne(id);
    return res.status(200).send({
      success: true,
      message: `Book id ${id} fetched successfully!`,
      book: book,
    });
  }
  @UseGuards(AuthGuard)
  @Get('delete/:id')
  async deleteOne(
    @GetAuthor('id') authorId: number,
    @Param('id') id: number,
    @Res() res: Response,
  ): Promise<Response<any, Record<string, any>>> {
    const book = await this.bookService.delete(id);
    return res.status(200).send({
      success: true,
      message: `Book id ${id} deleted successfully!`,
      book: book,
    });
  }

  @UseGuards(AuthGuard)
  @Get('find')
  async find(
    @GetAuthor('id') authorId: number,
    @Query('author_id') author_id: number,
    @Query('title') title: string,
    @Res() res: Response,
  ): Promise<Response<any, Record<string, any>>> {
    let books;
    if (title && author_id) {
      books = await this.bookService.find({
        title,
        authorId: author_id,
      });
    } else if (title) {
      books = await this.bookService.find({
        title,
        authorId,
      });
    } else if (author_id) {
      books = await this.bookService.find({
        authorId: author_id,
      });
    } else {
      books = await this.bookService.find({
        authorId,
      });
    }
    return res.status(200).send({
      success: true,
      message: `Books fetched successfully!`,
      books,
    });
  }
}
