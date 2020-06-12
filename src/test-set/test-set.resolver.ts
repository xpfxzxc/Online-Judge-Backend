import { UseGuards } from '@nestjs/common';
import { Args, Resolver, Mutation } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { Int } from 'type-graphql';
import { UserInputError } from 'apollo-server-core';
import { Repository } from 'typeorm';
import { mkdirSync, rmdirSync, writeFileSync, readFileSync, rmdir } from 'fs';
import { join } from 'path';
import * as anzip from 'anzip';
import * as yaml from 'js-yaml';

import { UploadTestSetResponse } from './upload-test-set.response';
import { AuthGuard } from 'src/guards/auth.guard';
import { ProblemsService } from 'src/problems/problems.service';
import { UserId } from 'src/decorators/user-id.decorator';
import { ProblemEntity } from 'src/generated/problem-entity';

@Resolver()
export class TestSetResolver {
  constructor(
    private problemsService: ProblemsService,
    @InjectRepository(ProblemEntity)
    private problemRepo: Repository<ProblemEntity>,
  ) {}

  @Mutation(() => UploadTestSetResponse, { name: 'upload_test_set' })
  @UseGuards(AuthGuard)
  async uploadTestSet(
    @UserId() userId: number,
    @Args({ name: 'problem_id', type: () => Int }) problemId: number,
    @Args('base64str') base64str: string,
  ) {
    const invalidArgs: any = {};

    if (!(await this.problemsService.checkIfExistsById(problemId))) {
      invalidArgs.problem_id = '题目 id 不存在';
    }

    if (Object.keys(invalidArgs).length > 0) {
      throw new UserInputError('User input error', { invalidArgs });
    }

    const homeDirpath = `\\\\wsl$\\Ubuntu-18.04\\home\\xpfxzxc`;
    const tempDirpath = join(homeDirpath, 'working-nodes', 'temp');
    //
    const zipDirpath = join(tempDirpath, 'test-set', `${Date.now()}`);
    const zipFilepath = join(zipDirpath, 'z.zip');
    const testSetDirPath = join(homeDirpath, 'test-set', `${problemId}`);
    const configFilepath = join(testSetDirPath, 'config.yml');
    const fileBuffer = Buffer.from(base64str.split(';base64,').pop(), 'base64');
    // 1.
    mkdirSync(zipDirpath, { recursive: true });

    // 2.
    writeFileSync(zipFilepath, fileBuffer);

    // 3. clear dir before unzipping
    rmdirSync(testSetDirPath, { recursive: true });

    // 4. assert dir before unzipping
    mkdirSync(testSetDirPath, { recursive: true });

    // 5. unzip
    await anzip(zipFilepath, { outputPath: testSetDirPath });

    // 6. load yml;
    const config = yaml.safeLoad(readFileSync(configFilepath).toString());

    // 7. update problem details
    await this.problemRepo.update(
      {
        id: problemId,
      },
      {
        timeLimit: config['timeLimit'],
        memoryLimit: config['memoryLimit'],
      },
    );

    // 8 remove zip dir
    rmdirSync(zipDirpath, { recursive: true });

    console.log(
      homeDirpath,
      tempDirpath,
      testSetDirPath,
      zipDirpath,
      configFilepath,
      zipFilepath,
    );

    return {
      timeLimit: config['timeLimit'],
      memoryLimit: config['memoryLimit'],
    };
  }
}
