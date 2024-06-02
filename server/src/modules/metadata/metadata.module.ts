import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Metadata } from './entities/metadata.entity';
import { MetadataController } from './metadata.controller';
import { MetadataService } from './metadata.service';

@Module({
  imports: [TypeOrmModule.forFeature([Metadata])],
  controllers: [MetadataController],
  providers: [MetadataService],
})
export class MetaDataModule {}
