import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const GetAuthor = createParamDecorator(
  (data: string | undefined, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    if (data) return request?.author[data];
    return request?.author || undefined;
  },
);
