import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { AuthorModule } from './author/author.module';
import { BookModule } from './book/book.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    AuthModule,
    AuthorModule,
    BookModule,
    PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  providers: [],
})
export class AppModule {}
