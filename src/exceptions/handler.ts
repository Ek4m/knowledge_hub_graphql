import {
  BadRequestException,
  Catch,
  ExceptionFilter,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { FormValidationException } from './validation.exception';
import { GraphQLError } from 'graphql';

@Catch()
export class GraphQLExceptionFilter implements ExceptionFilter {
  catch(exception: any) {
    if (exception instanceof FormValidationException) {
      return new GraphQLError(exception.message, {
        extensions: {
          code: 'BAD_USER_INPUT',
          errors: exception.getResponse(),
        },
      });
    } else if (exception instanceof UnauthorizedException) {
      return new GraphQLError(exception.message, {
        extensions: { code: 'UNAUTHORIZED', errors: exception.getResponse() },
      });
    } else if (exception instanceof BadRequestException) {
      return new GraphQLError(exception.message, {
        extensions: {
          code: 'BAD_REQUEST',
          errors: exception.getResponse(),
        },
      });
    } else if (exception instanceof InternalServerErrorException) {
      return new GraphQLError(exception.message, {
        extensions: {
          code: 'INTERNAL_SERVER_ERROR',
          errors: exception.getResponse(),
        },
      });
    } else {
      return exception;
    }
  }
}
