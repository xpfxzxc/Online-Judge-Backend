import { Field, ObjectType, Int } from 'type-graphql';

@ObjectType('logged_user')
export class LoggedUser {
  @Field(() => Int)
  id?: number;

  @Field()
  name?: string;

  @Field()
  email?: string;

  @Field()
  role?: string;
}
