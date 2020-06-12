import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AmqpOptionsInterface } from 'nestjs-amqp';

export const JWT_SECRET = 'q9j-Ct8iQD-Z8yuZRbAy6LulFo07VTKiRQntuSWWfRc';
export const ORM_CONFIG: TypeOrmModuleOptions = {
  name: 'default',
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'root',
  database: 'online-judge',
  schema: 'public',
  synchronize: false,
};
export const AMQP_CONFIG: AmqpOptionsInterface = {
  name: 'default',
  hostname: 'localhost',
  password: 'guest',
  port: 5672,
  username: 'guest',
};
export const JUDGING_QUEUE = 'judgement';
