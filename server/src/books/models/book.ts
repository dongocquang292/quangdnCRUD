import { Field, ObjectType, Int } from '@nestjs/graphql';
import { Book as BookDB } from '@prisma/client';
@ObjectType()
export class Book {
  @Field(() => Int)
  id: BookDB['id'];

  @Field(() => String)
  title: BookDB['title'];

  @Field(() => Int)
  price: BookDB['price'];
}
