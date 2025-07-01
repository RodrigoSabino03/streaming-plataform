import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import tracer from 'dd-trace';
import { LoggingInterceptor, TracingInterceptor, TransformInterceptor } from './datadog/datadog.service';

tracer.init();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new LoggingInterceptor());
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalInterceptors(new TracingInterceptor());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
