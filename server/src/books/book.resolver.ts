import { Args, Resolver, Query, Mutation } from '@nestjs/graphql';
import { Book } from './models/book';

import { GetBookArgs } from './dto/args/get-book.args';
import { GetBooksArgs } from './dto/args/get-books.args';

import { CreateBookInput } from './dto/input/create.book.input';
import { UpdateBookInput } from './dto/input/update.book.input';
import { DeleteBookInput } from './dto/input/delete.book.input';

import { BookService } from './book.service';

@Resolver(() => Book)
export class BookResolver {
  constructor(private readonly bookService: BookService) {}

  @Query(() => Book, { name: 'book', nullable: false })
  async getBook(@Args() getBookArgs: GetBookArgs): Promise<Book> {
    return this.bookService.getBook(getBookArgs);
  }

  @Query(() => [Book], { name: 'books', nullable: false })
  async getBooks(@Args() getBooksArgs: GetBooksArgs): Promise<Book[]> {
    return this.bookService.getBooks(getBooksArgs);
  }

  @Mutation(() => Book)
  async createBook(
    @Args('createBookData') createBookData: CreateBookInput,
  ): Promise<Book> {
    return this.bookService.createBook(createBookData);
  }

  @Mutation(() => Book)
  async updateBook(
    @Args('updateBookData') updateBookData: UpdateBookInput,
  ): Promise<Book> {
    return this.bookService.updateBook(updateBookData);
  }

  @Mutation(() => Book)
  async deleteBook(
    @Args('deleteBookData') deleteBookData: DeleteBookInput,
  ): Promise<Book> {
    return this.bookService.deleteBook(deleteBookData);
  }
}
