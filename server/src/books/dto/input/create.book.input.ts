import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateBookInput {
  @Field()
  id: number;
  @Field()
  title: string;

  @Field()
  price: number;
}
