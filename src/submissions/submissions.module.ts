import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SubmissionsService } from './submissions.service';
import { SubmissionEntity } from 'src/generated/submission-entity';

@Global()
@Module({
  exports: [SubmissionsService],
  imports: [TypeOrmModule.forFeature([SubmissionEntity])],
  providers: [SubmissionsService],
})
export class SubmissionsModule {}
