import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BooksModule } from './books/book.module';

@Module({
  imports: [ConfigModule.forRoot(), BooksModule],
  providers: [],
})
export class AppModule {}
