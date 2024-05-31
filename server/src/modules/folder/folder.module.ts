import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BookmarkService } from '../bookmark/bookmark.service';
import { Bookmark } from '../bookmark/entities/bookmark.entity';
import { Folder } from './entities/folder.entity';
import { FolderController } from './folder.controller';
import { FolderService } from './folder.service';

@Module({
  imports: [TypeOrmModule.forFeature([Folder, Bookmark])],
  controllers: [FolderController],
  providers: [FolderService, BookmarkService],
})
export class FolderModule {}
