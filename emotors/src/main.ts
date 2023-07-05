import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  const config = new DocumentBuilder()
    .setTitle('EMotors')
    .setDescription('A melhor loja de Carros do Brasil!')
    .setVersion('0.8')
    .addTag('Users')
    .addBearerAuth()
    .addTag('Comments')
    .addBearerAuth()
    .addTag('Announcement')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/doc', app, document);

  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true }),
    new ValidationPipe({
      transform: true,
      transformOptions: { groups: ['transform'] },
    }),
  );
  await app.listen(5000);
}
bootstrap();
