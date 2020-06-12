import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { ApolloError, UserInputError } from 'apollo-server-core';

import { CodesService } from 'src/codes/codes.service';
import { SubmitCodeInput } from './submit-code.input';
import { SubmitCodeResponse } from './submit-code.response';
import { ProblemsService } from 'src/problems/problems.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { UserId } from 'src/decorators/user-id.decorator';
import { SubmissionEntity } from 'src/generated/submission-entity';

@Resolver()
export class CodesResolver {
  constructor(
    private problemsService: ProblemsService,
    private codesService: CodesService,
  ) {}

  @Mutation(() => SubmitCodeResponse, { name: 'submit_code' })
  @UseGuards(AuthGuard)
  async submitCode(
    @UserId() userId: number,
    @Args('input')
    { problem_id: problemId, lang, content }: SubmitCodeInput,
  ) {
    const invalidArgs: any = {};

    if (!(await this.problemsService.checkIfExistsById(problemId))) {
      invalidArgs.problem_id = '题目 id 不存在';
    }

    if (Object.keys(invalidArgs).length > 0) {
      throw new UserInputError('User input error', { invalidArgs });
    }

    let submission: SubmissionEntity;
    try {
      submission = await this.codesService.submitCode(
        userId,
        problemId,
        lang,
        content,
      );
    } catch (err) {
      console.error(err);
      throw new ApolloError('服务器内部发生错误');
    }

    return {
      submissionId: submission.id,
    };
  }
}
