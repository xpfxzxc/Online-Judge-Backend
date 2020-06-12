import {
  ValidationPipe as NestValidationPipe,
  ArgumentMetadata,
  Injectable,
  BadRequestException,
} from '@nestjs/common';
import { UserInputError } from 'apollo-server-core';

@Injectable()
export class ValidationPipe extends NestValidationPipe {
  public async transform(value: any, metadata: ArgumentMetadata) {
    try {
      await super.transform(value, metadata);
    } catch (e) {
      let finalErr = e;

      if (e instanceof BadRequestException && metadata.type === 'body') {
        finalErr = new UserInputError('User input error', {
          invalidArgs: Object.assign(
            {},
            ...e.message.message.map((i: any) => ({
              [i.property]: i.constraints[Object.keys(i.constraints)[0]],
            })),
          ),
        });
      }

      throw finalErr;
    }

    return value;
  }
}
