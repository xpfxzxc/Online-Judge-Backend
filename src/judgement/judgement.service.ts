import { Injectable } from '@nestjs/common';
import { InjectAmqpConnection } from 'nestjs-amqp';
import { Connection } from 'amqplib';

import { JudgementTask } from './judgement-task.interface';
import { JUDGING_QUEUE } from 'src/constants';

@Injectable()
export class JudgementService {
  constructor(@InjectAmqpConnection() private amqp: Connection) {}

  async pushTask(task: JudgementTask): Promise<void> {
    const channel = await this.amqp.createChannel();
    const queue = JUDGING_QUEUE;

    await channel.assertQueue(queue);

    const msg = JSON.stringify({
      problemId: task.problemId,
      code: task.code,
      lang: task.lang,
      userId: task.userId,
      submissionId: task.submissionId,
    });

    await channel.sendToQueue(queue, Buffer.from(msg), { persistent: true });

    await channel.close();
  }
}
