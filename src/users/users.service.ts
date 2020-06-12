import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserEntity } from 'src/generated/user-entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity) private repo: Repository<UserEntity>,
  ) {}

  async checkIfExistsById(id: number | string): Promise<boolean> {
    id = +id;

    if (!Number.isInteger(id)) {
      return false;
    }

    return (await this.repo.count({ id })) > 0;
  }

  async getUserByName(name: string): Promise<UserEntity> {
    const user = await this.repo.findOne({ name });
    return user || null;
  }

  async getUserByEmail(email: string): Promise<UserEntity> {
    const user = await this.repo.findOne({ email });
    return user || null;
  }

  async insertUser(obj: Partial<UserEntity>): Promise<UserEntity> {
    return this.repo.save(this.repo.create(obj));
  }
}
