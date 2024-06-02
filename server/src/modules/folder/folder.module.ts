import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BookmarkService } from '../bookmark/bookmark.service';
import { Bookmark } from '../bookmark/entities/bookmark.entity';
import { Metadata } from '../metadata/entities/metadata.entity';
import { MetadataService } from '../metadata/metadata.service';
import { Folder } from './entities/folder.entity';
import { FolderController } from './folder.controller';
import { FolderService } from './folder.service';

@Module({
  imports: [TypeOrmModule.forFeature([Folder, Bookmark, Metadata])],
  controllers: [FolderController],
  providers: [FolderService, BookmarkService, MetadataService],
})
export class FolderModule {}
