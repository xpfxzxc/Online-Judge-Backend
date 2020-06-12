import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ProblemEntity } from 'src/generated/problem-entity';

@Injectable()
export class ProblemsService {
  constructor(
    @InjectRepository(ProblemEntity) private repo: Repository<ProblemEntity>,
  ) {}

  async checkIfExistsById(id: number | string): Promise<boolean> {
    id = +id;

    if (!Number.isInteger(id)) {
      return false;
    }

    return (await this.repo.count({ id })) > 0;
  }
}
