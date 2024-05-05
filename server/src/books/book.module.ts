import { join } from 'path';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import {
  ApolloDriver,
  ApolloDriverConfig,
  // ApolloFederationDriver,
  // ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { PrismaModule } from 'src/database/prisma.module';

import { BookResolver } from './book.resolver';
import { BookService } from './book.service';
import { BookRepository } from './book.repository';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    PrismaModule,
  ],
  providers: [BookResolver, BookRepository, BookService],
  exports: [BookResolver, BookService],
})
export class BooksModule {}
