import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TestSetService } from './test-set.service';
import { TestSetResolver } from './test-set.resolver';
import { ProblemEntity } from 'src/generated/problem-entity';

@Global()
@Module({
  exports: [TestSetService],
  imports: [TypeOrmModule.forFeature([ProblemEntity])],
  providers: [TestSetService, TestSetResolver],
})
export class TestSetModule {}
