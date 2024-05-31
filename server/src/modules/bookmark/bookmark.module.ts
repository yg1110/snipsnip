import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Folder } from '../folder/entities/folder.entity';
import { FolderService } from '../folder/folder.service';
import { BookmarkController } from './bookmark.controller';
import { BookmarkService } from './bookmark.service';
import { Bookmark } from './entities/bookmark.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Bookmark, Folder])],
  controllers: [BookmarkController],
  providers: [BookmarkService, FolderService],
})
export class BookmarkModule {}
