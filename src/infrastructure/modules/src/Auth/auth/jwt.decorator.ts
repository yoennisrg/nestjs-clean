import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { IJWTPayload } from '../types/JWT';

export const JWTPayload = createParamDecorator((_data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  return request.user as IJWTPayload;
});
