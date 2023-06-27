import {
  BadRequestException,
  createParamDecorator,
  ExecutionContext,
} from '@nestjs/common';

export const IntIdParam = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext): number => {
    const request = ctx.switchToHttp().getRequest();
    const key = data || 'id';
    const id = +request.params[key];

    if (!Number.isInteger(id))
      throw new BadRequestException(`${key} param is not an integer`);
    if (id <= 0)
      throw new BadRequestException(`${key} param must be bigger than 0`);

    return id;
  },
);
