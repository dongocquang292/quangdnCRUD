import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class UpdateAuthorInput {
  @Field(() => Int)
  @IsNotEmpty()
  id: number;

  @Field(() => Boolean)
  @IsNotEmpty()
  isPaid: boolean;

  @Field(() => Int)
  @IsNotEmpty()
  price: number;
}
