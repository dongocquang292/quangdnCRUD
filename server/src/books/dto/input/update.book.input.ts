import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateBookInput {
  @Field()
  id: number;

  @Field()
  title: string;

  @Field()
  price: number;
}
