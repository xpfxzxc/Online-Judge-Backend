import { Field, ObjectType, Int } from 'type-graphql';

@ObjectType('upload_test_set_response')
export class UploadTestSetResponse {
  @Field(() => Int, { name: 'time_limit' })
  timeLimit: number;

  @Field(() => Int, { name: 'memory_limit' })
  memoryLimit: number;
}
