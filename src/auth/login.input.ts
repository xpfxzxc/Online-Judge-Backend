import { InputType, Field } from 'type-graphql';

@InputType('login_input')
export class LoginInput {
  @Field()
  name: string;

  @Field()
  password: string;
}
