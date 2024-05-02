import { ArgsType, Field } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@ArgsType()
export class GetAuthorsArgs {
  @Field(() => String)
  @IsString()
  address?: string;

}
