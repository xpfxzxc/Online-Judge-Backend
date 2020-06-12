import { Field, Int, ObjectType } from 'type-graphql';
import { LoggedUser } from 'src/types/logged-user.type';

@ObjectType('login_response')
export class LoginResponse {
  @Field()
  token: string;

  @Field(() => LoggedUser)
  user: LoggedUser;
}
