import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

import { CreateFolderDto } from './dto/foler.dto';
import { FolderService } from './folder.service';

@ApiTags('Folders')
@Controller('folders')
export class FolderController {
  constructor(private readonly folderService: FolderService) {}

  @ApiOperation({
    summary: '폴더 생성하기',
  })
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

  @ApiOperation({
    summary: '루트 폴더 조회하기',
    description: `
    [
      {
        "id": 1,
        "name": "폴더 이름",
        "parentFolderId": null,
        "order": 1,
        "createdAt": "2024-05-30T05:58:10.000Z",
        "updatedAt": "2024-05-30T05:58:10.000Z",
        "deletedAt": null
      }
    ]`,
  })
  @Get()
  findAll() {
    return this.folderService.findAllRoot();
  }

  @ApiOperation({
    summary: '하위 폴더 조회하기',
    description: `
    [
      {
        "id": 2,
        "name": "폴더 이름2",
        "parentFolderId": 1,
        "order": 1,
        "createdAt": "2024-05-30T06:06:52.000Z",
        "updatedAt": "2024-05-30T06:06:52.000Z",
        "deletedAt": null
      }
    ]`,
  })
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.folderService.findSubFolders(id);
  }
}
