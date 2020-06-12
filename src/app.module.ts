import { Module, Global } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AmqpModule } from 'nestjs-amqp';
import { getMetadataArgsStorage } from 'typeorm';
import { join } from 'path';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppResolver } from './app.resolver';
import { AuthModule } from './auth/auth.module';
import { ORM_CONFIG, AMQP_CONFIG } from './constants';
import { UsersModule } from './users/users.module';
import { SubmissionsModule } from './submissions/submissions.module';
import { CodesModule } from './codes/codes.module';
import { ProblemsModule } from './problems/problems.module';
import { JudgementModule } from './judgement/judgement.module';
import { TestSetModule } from './test-set/test-set.module';

@Global()
@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), './src/my-schema.gql'),
      context: ({ req }) => ({ req }),
    }),
    TypeOrmModule.forRoot({
      ...ORM_CONFIG,
      entities: getMetadataArgsStorage().tables.map(tbl => tbl.target),
    }),
    AmqpModule.forRoot(AMQP_CONFIG),
    AuthModule,
    UsersModule,
    SubmissionsModule,
    CodesModule,
    ProblemsModule,
    JudgementModule,
    TestSetModule,
  ],
  controllers: [AppController],
  exports: [AmqpModule],
  providers: [AppService, AppResolver],
})
export class AppModule {}
