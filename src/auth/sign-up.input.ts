import { InputType, Field } from 'type-graphql';
import { Length, MinLength, IsEmail } from 'class-validator';

@InputType('sign_up_input')
export class SignUpInput {
  @Field()
  @Length(2, 25)
  name: string;

  @Field()
  @MinLength(8)
  password: string;

  @Field()
  @IsEmail()
  email: string;
}
