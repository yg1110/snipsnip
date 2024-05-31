import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

import { BookmarkService } from './bookmark.service';
import { CreateBookmarkDto, UpdateBookmarkDto } from './dto/bookmark.dto';

@ApiTags('Bookmarks')
@Controller('bookmarks')
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
        thumbnail: null,
        order: 1,
      },
    },
  })
  @Post()
  create(@Body() createBookmarkDto: CreateBookmarkDto) {
    return this.bookmarkService.create(createBookmarkDto);
  }

  @ApiOperation({
    summary: '폴더의 북마크 전체 조회하기',
    description: `
    [
      {
        "id": 1,
        "folderId": 1,
        "title": "북마크 이름",
        "thumbnail": null,
        "url": "https://www.naver.com",
        "order": 1,
        "createdAt": "2024-05-31T03:06:14.000Z",
        "updatedAt": "2024-05-31T03:06:14.000Z",
        "deletedAt": null
      }
    ]`,
  })
  @Get(':folderId')
  findAllByFolderId(@Param('folderId') folderId: number) {
    return this.bookmarkService.findAllByFolderId(folderId);
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
        thumbnail: null,
        order: 1,
      },
    },
  })
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateBookmarkDto: UpdateBookmarkDto) {
    return this.bookmarkService.update(+id, updateBookmarkDto);
  }

  @ApiOperation({
    summary: '북마크 삭제하기',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookmarkService.remove(+id);
  }
}
