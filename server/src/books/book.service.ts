import { Injectable } from '@nestjs/common';
import { Book } from './models/book';

import { CreateBookInput } from './dto/input/create.book.input';
import { UpdateBookInput } from './dto/input/update.book.input';
import { DeleteBookInput } from './dto/input/delete.book.input';

import { GetBookArgs } from './dto/args/get-book.args';
import { GetBooksArgs } from './dto/args/get-books.args';

import { BookRepository } from './book.repository';

@Injectable()
export class BookService {
  constructor(private repository: BookRepository) {}

  public async getBook(getBookArgs: GetBookArgs): Promise<Book> {
    return await this.repository.getBook({
      where: { id: getBookArgs.id },
    });
  }
  public async getBooks(getBooksArgs: GetBooksArgs): Promise<Book[]> {
    return await this.repository.getBooks({
      where: {
        OR: [{ id: { in: getBooksArgs.ids } }],
      },
    });
  }

  public async createBook(createBookData: CreateBookInput): Promise<Book> {
    const book = await this.repository.createBook({
      data: {
        id: Math.random(),
        ...createBookData,
      },
    });
    return book;
  }
  public async updateBook(updateBookData: UpdateBookInput): Promise<Book> {
    const book = await this.repository.updateBook({
      where: { id: updateBookData.id },
      data: updateBookData,
    });

    return book;
  }

  public async deleteBook(deleteBookData: DeleteBookInput): Promise<Book> {
    const book = await this.repository.deleteBook({
      where: {
        id: deleteBookData.id,
      },
    });

    return book;
  }
}
