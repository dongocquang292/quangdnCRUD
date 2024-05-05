import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class DeleteBookInput {
  @Field()
  id: number;
}
