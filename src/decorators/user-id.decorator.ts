import { createParamDecorator } from '@nestjs/common';

export const UserId = createParamDecorator((data, [root, args, ctx, info]) => {
  return ctx.req.__userId;
});
