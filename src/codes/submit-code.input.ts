import { InputType, Field, ID } from 'type-graphql';

@InputType('submit_code_input')
export class SubmitCodeInput {
  @Field(() => ID)
  problem_id: number;

  @Field()
  lang: string;

  @Field()
  content: string;
}
