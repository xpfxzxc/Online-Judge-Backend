import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CodesService } from './codes.service';
import { CodeEntity } from 'src/generated/code-entity';
import { CodesResolver } from './codes.resolver';

@Global()
@Module({
  exports: [CodesService],
  imports: [TypeOrmModule.forFeature([CodeEntity])],
  providers: [CodesService, CodesResolver],
})
export class CodesModule {}
