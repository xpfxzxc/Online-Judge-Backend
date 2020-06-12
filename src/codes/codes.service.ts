import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Connection } from 'typeorm';

import { CodeEntity } from 'src/generated/code-entity';
import { SubmissionEntity } from 'src/generated/submission-entity';
import { JudgementService } from 'src/judgement/judgement.service';

@Injectable()
export class CodesService {
  constructor(
    @InjectRepository(CodeEntity) private repo: Repository<CodeEntity>,
    private connection: Connection,
    private judgingService: JudgementService,
  ) {}

  async submitCode(
    userId: number,
    problemId: number,
    lang: string,
    content: string,
  ) {
    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    let ret: SubmissionEntity;

    try {
      const code = new CodeEntity({
        lang,
        content,
      });
      await queryRunner.manager.save(code);

      const submission = new SubmissionEntity({
        code,
        problem: { id: problemId } as any,
        user: { id: userId } as any,
      });
      ret = await queryRunner.manager.save(submission);

      await this.judgingService.pushTask({
        problemId,
        code: content,
        lang,
        userId,
        submissionId: submission.id,
      });

      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }

    return ret;
  }
}
