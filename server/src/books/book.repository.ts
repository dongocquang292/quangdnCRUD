import { Injectable } from '@nestjs/common';
import { Prisma, Book } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class BookRepository {
  constructor(private prisma: PrismaService) {}

  async createBook(params: { data: Prisma.BookCreateInput }): Promise<Book> {
    const { data } = params;
    return this.prisma.book.create({ data });
  }

  async getBook(params: {
    where?: Prisma.BookWhereUniqueInput;
  }): Promise<Book> {
    const { where } = params;
    return this.prisma.book.findUnique({ where });
  }

  async getBooks(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.BookWhereUniqueInput;
    where?: Prisma.BookWhereInput;
    orderBy?: Prisma.BookOrderByWithRelationInput;
  }): Promise<Book[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.book.findMany({ skip, take, cursor, where, orderBy });
  }

  async updateBook(params: {
    where: Prisma.BookWhereUniqueInput;
    data: Prisma.BookUpdateInput;
  }): Promise<Book> {
    const { where, data } = params;
    return this.prisma.book.update({ where, data });
  }

  async deleteBook(params: {
    where: Prisma.BookWhereUniqueInput;
  }): Promise<Book> {
    const { where } = params;
    return this.prisma.book.delete({ where });
  }
}
