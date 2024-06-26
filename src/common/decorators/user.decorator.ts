import { CatCurrentDto } from './../../cats/dto/cat.current.dto';
import { Request } from 'express';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request: Request = ctx.switchToHttp().getRequest();
    return request.user as CatCurrentDto;
  },
);
