import { Module, Global } from '@nestjs/common';

import { JudgementService } from './judgement.service';

@Global()
@Module({
  exports: [JudgementService],
  providers: [JudgementService],
})
export class JudgementModule {}
