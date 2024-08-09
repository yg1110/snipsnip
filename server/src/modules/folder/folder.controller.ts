import {
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import {
  CreateFolderDto,
  UpdateFolderDto,
  UpdateRootFoldersOrderDto,
  UpdateSubFoldersOrderDto,
} from './dto/foler.dto';
import { FolderService } from './folder.service';

@ApiTags('Folders')
@Controller()
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
  @Post('folders')
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
  @Get('folders')
  findAllRoot(@Req() req) {
    const userId = req.user.id;
    return this.folderService.findAllRoot(userId);
  }

  @ApiOperation({
    summary: '모든 폴더 조회하기',
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
  @Get('folders/all')
  findAll(@Req() req) {
    const userId = req.user.id;
    return this.folderService.findAll(userId);
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
  @Get('folders/:id')
  findSubFolders(@Param('id') id: number, @Req() req) {
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
  @Patch('folders/:id')
  update(@Param('id') id: number, @Body() updateFolderDto: UpdateFolderDto, @Req() req) {
    const userId = req.user.id;
    return this.folderService.update(id, userId, updateFolderDto);
  }

  @ApiOperation({
    summary: '폴더 삭제하기',
  })
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard('jwt'))
  @Delete('folders/:id')
  remove(@Param('id') id: number, @Req() req) {
    const userId = req.user.id;
    return this.folderService.remove(id, userId);
  }

  @ApiOperation({
    summary: '폴더 상세 조회하기',
    description: `
    {
      "id": 2,
      "name": "폴더 이름2",
      "parentFolderId": 1,
      "order": 1,
      "createdAt": "2024-05-30T06:06:52.000Z",
      "updatedAt": "2024-05-30T06:06:52.000Z",
      "deletedAt": null
    }`,
  })
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard('jwt'))
  @Get('/folder/:id')
  @ApiResponse({ type: 'null' })
  async findOne(@Param('id') id: number, @Req() req) {
    const userId = req.user.id;
    const folder = await this.folderService.findOne(id, userId);
    if (!folder) {
      throw new InternalServerErrorException('폴더가 존재하지 않습니다.');
    }
    return folder;
  }

  @ApiOperation({
    summary: '서브 폴더 순서 변경하기',
  })
  @ApiBody({
    schema: {
      example: {
        parentFolderId: 1,
        folderList: [
          {
            id: 1,
            name: '서브1',
            userId: 1,
            parentFolderId: 1,
            order: 1,
            createdAt: '2024-08-08T05:32:03.000Z',
            updatedAt: '2024-08-08T06:28:53.000Z',
            deletedAt: null,
            subFolderCount: 0,
            bookmarkCount: 0,
          },
          {
            id: 2,
            name: '서브2',
            userId: 1,
            parentFolderId: 1,
            order: 2,
            createdAt: '2024-08-07T15:10:29.000Z',
            updatedAt: '2024-08-08T06:28:53.000Z',
            deletedAt: null,
            subFolderCount: 0,
            bookmarkCount: 1,
          },
        ],
      },
    },
  })
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard('jwt'))
  @Post('/sub-folders/order')
  updateSubFoldersOrder(@Body() updateSubFoldersOrderDto: UpdateSubFoldersOrderDto, @Req() req) {
    const userId = req.user.id;
    return this.folderService.updateSubFoldersOrder(
      userId,
      updateSubFoldersOrderDto.parentFolderId,
      updateSubFoldersOrderDto.folderList,
    );
  }

  @ApiOperation({
    summary: '루트 폴더 순서 변경하기',
  })
  @ApiBody({
    schema: {
      example: {
        folderList: [
          {
            id: 1,
            name: '루트1',
            userId: 1,
            parentFolderId: null,
            order: 1,
            createdAt: '2024-08-07T05:39:36.000Z',
            updatedAt: '2024-08-08T06:49:23.000Z',
            deletedAt: null,
            subFolderCount: 0,
            bookmarkCount: 0,
          },
          {
            id: 1,
            name: '루트2',
            userId: 1,
            parentFolderId: null,
            order: 2,
            createdAt: '2024-08-08T05:31:32.000Z',
            updatedAt: '2024-08-08T06:49:23.000Z',
            deletedAt: null,
            subFolderCount: 0,
            bookmarkCount: 0,
          },
        ],
      },
    },
  })
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard('jwt'))
  @Post('/root-folders/order')
  updateRootFoldersOrder(@Body() updateRootFoldersOrderDto: UpdateRootFoldersOrderDto, @Req() req) {
    const userId = req.user.id;
    return this.folderService.updateRootFoldersOrder(userId, updateRootFoldersOrderDto.folderList);
  }
}
