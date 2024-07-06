import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerCustomOptions, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { AuthModule } from './modules/auth/auth.module';
import { BookmarkModule } from './modules/bookmark/bookmark.module';
import { FolderModule } from './modules/folder/folder.module';
import { MetaDataModule } from './modules/metadata/metadata.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log'],
  });
  const swaggerConfig = new DocumentBuilder()
    .setTitle('SnipSnip Swagger')
    .setDescription('SnipSnip backend api description')
    .setVersion('1.0.0')
    .addTag('swagger')
    .build();

  app.enableCors({
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  const document = SwaggerModule.createDocument(app, swaggerConfig, {
    include: [BookmarkModule, FolderModule, MetaDataModule, AuthModule],
  });

  const swaggerOptions: SwaggerCustomOptions = {
    swaggerOptions: {
      persistAuthorization: true,
    },
  };

  SwaggerModule.setup('api', app, document, swaggerOptions);
  await app.listen(8000);
}
bootstrap();
