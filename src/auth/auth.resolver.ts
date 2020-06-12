import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { UserInputError, AuthenticationError } from 'apollo-server-core';

import { SignUpInput } from './sign-up.input';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { LoginResponse } from './login.response';
import { LoginInput } from './login.input';
import { UserEntity } from 'src/generated/user-entity';

@Resolver()
export class AuthResolver {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @Mutation(() => Boolean, { name: 'sign_up' })
  async signUp(@Args('input') { name, password, email }: SignUpInput) {
    const invalidArgs: any = {};

    if (await this.usersService.getUserByName(name)) {
      invalidArgs.name = '该用户名已被注册';
    }

    if (await this.usersService.getUserByEmail(email)) {
      invalidArgs.email = '该邮箱地址已被注册';
    }

    if (Object.keys(invalidArgs).length > 0) {
      throw new UserInputError('User input error', { invalidArgs });
    }

    const encryptedPassword = await this.authService.encryptPassword(password);
    await this.usersService.insertUser({
      name,
      password: encryptedPassword,
      email,
    });

    return true;
  }

  @Mutation(() => LoginResponse)
  async login(
    @Args('input') { name, password }: LoginInput,
  ): Promise<LoginResponse> {
    let user: UserEntity;

    if (name.includes('@')) {
      user = await this.usersService.getUserByEmail(name);
    } else {
      user = await this.usersService.getUserByName(name);
    }

    if (
      !user ||
      !(await this.authService.verifyPassword(password, user.password))
    ) {
      throw new AuthenticationError('用户名/邮箱地址或密码错误');
    }

    const token = this.authService.generateJWT(user.id, user.role);

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    };
  }
}
