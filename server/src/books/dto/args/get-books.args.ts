import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class GetBooksArgs {
  @Field(() => [Number])
  ids?: number[];
}
