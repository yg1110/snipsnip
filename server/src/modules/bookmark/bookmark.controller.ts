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
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

import { BookmarkService } from './bookmark.service';
import { CreateBookmarkDto, UpdateBookmarkDto } from './dto/bookmark.dto';

@ApiTags('Bookmarks')
@Controller()
export class BookmarkController {
  constructor(private readonly bookmarkService: BookmarkService) {}

  @ApiOperation({
    summary: '북마크 생성하기',
  })
  @ApiBody({
    schema: {
      example: {
        title: '북마크 이름',
        url: 'https://www.naver.com',
        folderId: 1,
        order: 1,
      },
    },
  })
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard('jwt'))
  @Post('bookmarks')
  create(@Body() createBookmarkDto: CreateBookmarkDto, @Req() req) {
    const userId = req.user.id;
    return this.bookmarkService.create({ ...createBookmarkDto, userId });
  }

  @ApiOperation({
    summary: '폴더의 북마크 전체 조회하기',
    description: `
    [
      {
        "id": 1,
        "folderId": 1,
        "title": "북마크 이름",
        "url": "https://www.naver.com",
        "order": 1,
        "createdAt": "2024-05-31T03:06:14.000Z",
        "updatedAt": "2024-05-31T03:06:14.000Z",
        "deletedAt": null,
        "metadata": {
          "url": "https://www.naver.com",
          "title": "네이버",
          "thumbnail": "https://s.pstatic.net/static/www/mobile/edit/2016/0705/mobile_212852414260.png",
          "description": "네이버 메인에서 다양한 정보와 유용한 컨텐츠를 만나 보세요",
          "id": 1
        },
      }
    ]`,
  })
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard('jwt'))
  @Get('bookmarks/:folderId')
  findAllByFolderId(@Param('folderId') folderId: number, @Req() req) {
    const userId = req.user.id;
    return this.bookmarkService.findAllByFolderId(folderId, userId);
  }

  @ApiOperation({
    summary: '북마크 수정하기',
  })
  @ApiBody({
    schema: {
      example: {
        title: '수정된 북마크 이름',
        url: 'https://www.naver.com',
        folderId: 1,
        order: 1,
      },
    },
  })
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard('jwt'))
  @Patch('bookmarks/:id')
  update(@Param('id') id: number, @Body() updateBookmarkDto: UpdateBookmarkDto, @Req() req) {
    const userId = req.user.id;
    return this.bookmarkService.update(id, userId, updateBookmarkDto);
  }

  @ApiOperation({
    summary: '북마크 삭제하기',
  })
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard('jwt'))
  @Delete('bookmarks/:id')
  remove(@Param('id') id: string, @Req() req) {
    const userId = req.user.id;
    return this.bookmarkService.remove(+id, userId);
  }

  @ApiOperation({
    summary: '북마크 상세 조회하기',
    description: `
    {
      "id": 1,
      "folderId": 1,
      "title": "북마크 이름",
      "url": "https://www.naver.com",
      "order": 1,
      "createdAt": "2024-05-31T03:06:14.000Z",
      "updatedAt": "2024-05-31T03:06:14.000Z",
      "deletedAt": null,
      "metadata": {
        "url": "https://www.naver.com",
        "title": "네이버",
        "thumbnail": "https://s.pstatic.net/static/www/mobile/edit/2016/0705/mobile_212852414260.png",
        "description": "네이버 메인에서 다양한 정보와 유용한 컨텐츠를 만나 보세요",
        "id": 1
      }
    }`,
  })
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard('jwt'))
  @Get('/bookmark/:id')
  findOne(@Param('id') id: number, @Req() req) {
    const userId = req.user.id;
    const bookmark = this.bookmarkService.findOne(id, userId);
    if (!bookmark) {
      throw new InternalServerErrorException('북마크가 존재하지 않습니다.');
    }
    return bookmark;
  }
}
