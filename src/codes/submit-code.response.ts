import { Field, ObjectType, ID } from 'type-graphql';

@ObjectType('submit_code_response')
export class SubmitCodeResponse {
  @Field(() => ID, { name: 'submission_id' })
  submissionId?: string;
}
