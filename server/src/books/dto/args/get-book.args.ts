import { ArgsType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@ArgsType()
export class GetBookArgs {
  @Field()
  @IsNotEmpty()
  id: string;
}
