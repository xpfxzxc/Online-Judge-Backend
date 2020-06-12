import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { SubmissionEntity } from 'src/generated/submission-entity';

@Injectable()
export class SubmissionsService {
  constructor(
    @InjectRepository(SubmissionEntity)
    private repo: Repository<SubmissionEntity>,
  ) {}
}
