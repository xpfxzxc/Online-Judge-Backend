import { Catch } from '@nestjs/common';
import { GqlExceptionFilter, GqlArgumentsHost } from '@nestjs/graphql';
import { UserInputError, AuthenticationError } from 'apollo-server-core';

@Catch(UserInputError, AuthenticationError)
export class ApolloFilter implements GqlExceptionFilter {
  catch(exception: UserInputError, host: GqlArgumentsHost) {
    return exception;
  }
}
