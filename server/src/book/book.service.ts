import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { BookDto } from './dto/book-dto';

@Injectable()
export class BookService {
  constructor(private readonly prisma: PrismaService) {}

  async create(bookDto: BookDto, authorId: number) {
    try {
      if (bookDto.description) {
        return await this.prisma.book.create({
          data: {
            title: bookDto.title,
            link: bookDto.link,
            description: bookDto.description,
            authorId,
          },
        });
      } else {
        return await this.prisma.book.create({
          data: {
            title: bookDto.title,
            link: bookDto.link,
            description: bookDto.description,
            authorId,
          },
        });
      }
    } catch (error) {
      throw new InternalServerErrorException(error?.message);
    }
  }

  async update(bookDto: BookDto) {
    try {
      if (!bookDto.description) {
        const updated_book = await this.prisma.book.update({
          where: {
            id: bookDto.id,
          },
          data: {
            title: bookDto.title,
            link: bookDto.link,
          },
        });
        return updated_book;
      } else {
        const updated_book = await this.prisma.book.update({
          where: {
            id: bookDto.id,
          },
          data: {
            title: bookDto.title,
            link: bookDto.link,
            description: bookDto.description,
          },
        });
        return updated_book;
      }
    } catch (error) {
      throw new InternalServerErrorException(error?.message);
    }
  }

  async find({ title, authorId }: { title?: string; authorId?: number }) {
    try {
      if (title && authorId) {
        return await this.prisma.book.findMany({
          where: {
            title: {
              contains: title,
            },
            authorId,
          },
        });
      } else if (title) {
        return await this.prisma.book.findMany({
          where: {
            title: {
              contains: title,
            },
          },
        });
      } else if (authorId) {
        return await this.prisma.book.findMany({
          where: {
            authorId,
          },
        });
      } else {
        return await this.prisma.book.findMany();
      }
    } catch (error) {
      throw new InternalServerErrorException(error?.message);
    }
  }

  async delete(id: number) {
    try {
      const deleted_book = await this.prisma.book.delete({
        where: {
          id: parseInt(`${id}`),
        },
      });

      return deleted_book;
    } catch (error) {
      throw new InternalServerErrorException(error?.message);
    }
  }

  async findOne(id: number) {
    try {
      console.log({
        id,
      });

      const book = await this.prisma.book.findUnique({
        where: {
          id: parseInt(`${id}`),
        },
      });
      return book;
    } catch (error) {
      throw new InternalServerErrorException(error?.message);
    }
  }

  async findByAuthorId(authorId: number) {
    try {
      const books = await this.prisma.book.findMany({
        where: {
          authorId,
        },
      });
      return books;
    } catch (error) {
      throw new InternalServerErrorException(error?.message);
    }
  }
}
