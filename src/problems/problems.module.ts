import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProblemsService } from './problems.service';
import { ProblemEntity } from 'src/generated/problem-entity';

@Global()
@Module({
  exports: [ProblemsService],
  imports: [TypeOrmModule.forFeature([ProblemEntity])],
  providers: [ProblemsService],
})
export class ProblemsModule {}
