import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';
import { CreateAddressInput } from '../../../address/dto/input/create-address.input';
import { CreateReviewInput } from '../../../reviews/dto/input/create-review.input';

@InputType()
export class CreateAuthorInput {
  @Field()
  @IsNotEmpty()
  name: string;

  @Field()
  @IsNotEmpty()
  email: string;

  @Field()
  @IsNotEmpty()
  age: number;

  @Field(() => CreateAddressInput)
  address: CreateAddressInput;

  @Field(() => [CreateReviewInput])
  reviews: CreateReviewInput[];
}
