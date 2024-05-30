import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';

import { CreateFolderDto } from './dto/foler.dto';
import { FolderService } from './folder.service';

@ApiTags('Folders')
@Controller('folders')
export class FolderController {
  constructor(private readonly folderService: FolderService) {}

  @ApiBody({
    schema: {
      example: {
        name: '폴더 이름',
        parentFolderId: null,
        order: 1,
      },
    },
  })
  @Post()
  async createFolder(@Body() createFolderDto: CreateFolderDto) {
    return this.folderService.create(createFolderDto);
  }
}
