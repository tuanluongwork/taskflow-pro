import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext().req;
    
    // If it's a GraphQL request
    if (request) {
      return request.user;
    }
    
    // Otherwise, it's a REST request
    const restRequest = context.switchToHttp().getRequest();
    return restRequest.user;
  },
); 