import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthenticationError } from 'apollo-server-core';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';

import { JWT_SECRET } from 'src/constants';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private usersService: UsersService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const req: Request = ctx.getContext().req;
    const prefix = 'Bearer ';

    const authorization = req.get('authorization');
    if (!authorization || !authorization.startsWith(prefix)) {
      throw new AuthenticationError('token expired');
    }

    const token = authorization.slice(prefix.length);
    let userId: number;

    await new Promise(resolve => {
      jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
          throw new AuthenticationError('token expired');
        }

        req['__userId'] = userId = +decoded['https://hasura.io/jwt/claims'][
          'x-hasura-user-id'
        ];
        resolve();
      });
    });

    if (!(await this.usersService.checkIfExistsById(userId))) {
      throw new AuthenticationError('token expired');
    }

    return true;
  }
}
