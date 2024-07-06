import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

import { CreateFolderDto, UpdateFolderDto } from './dto/foler.dto';
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
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard('jwt'))
  @Post()
  async createFolder(@Body() createFolderDto: CreateFolderDto, @Req() req) {
    const userId = req.user.id;
    return this.folderService.create({ ...createFolderDto, userId });
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
        "userId": 1,
        "createdAt": "2024-05-30T05:58:10.000Z",
        "updatedAt": "2024-05-30T05:58:10.000Z",
        "deletedAt": null
      }
    ]`,
  })
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll(@Req() req) {
    const userId = req.user.id;
    return this.folderService.findAllRoot(userId);
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
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  findOne(@Param('id') id: number, @Req() req) {
    const userId = req.user.id;
    return this.folderService.findSubFolders(id, userId);
  }

  @ApiOperation({
    summary: '폴더 수정하기',
  })
  @ApiBody({
    schema: {
      example: {
        name: '수정된 폴더 이름',
        parentFolderId: null,
        order: 1,
      },
    },
  })
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateFolderDto: UpdateFolderDto, @Req() req) {
    const userId = req.user.id;
    return this.folderService.update(id, userId, updateFolderDto);
  }

  @ApiOperation({
    summary: '폴더 삭제하기',
  })
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') id: number, @Req() req) {
    const userId = req.user.id;
    return this.folderService.remove(id, userId);
  }
}
