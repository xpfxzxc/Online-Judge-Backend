import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { ApolloFilter } from './filters/apollo.filter';
import { ValidationPipe } from './pipes/validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new ApolloFilter());
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
