import { ArgsType, Field } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@ArgsType()
export class GetBooksArgs {
  @Field(() => String)
  @IsString()
  authorId: string;
}
