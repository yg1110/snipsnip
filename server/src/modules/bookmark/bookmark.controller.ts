import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

import { BookmarkService } from './bookmark.service';
import { CreateBookmarkDto, UpdateBookmarkDto } from './dto/bookmark.dto';

@ApiTags('Bookmarks')
@Controller('bookmarks')
export class BookmarkController {
  constructor(private readonly bookmarkService: BookmarkService) {}

  @ApiBody({
    schema: {
      example: {
        title: '네이버 북마크',
        url: 'https://www.naver.com',
        description: '네이버',
      },
    },
  })
  @Post()
  create(@Body() createBookmarkDto: CreateBookmarkDto) {
    return this.bookmarkService.create(createBookmarkDto);
  }

  @ApiOperation({
    summary: '북마크 전체 조회하기',
  })
  @ApiOperation({
    summary: '북마크 작성하기',
    description: `
    [
      {
        "id": 1,
        "title": "네이버 북마크",
        "url": "https://www.naver.com",
        "description": "네이버",
        "createdAt": "2024-05-22T09:41:12.000Z",
        "updatedAt": "2024-05-22T09:41:12.000Z"
      }
    ]`,
  })
  @Get()
  findAll() {
    return this.bookmarkService.findAll();
  }

  @ApiOperation({
    summary: '북마크 상세 조회하기',
    description: `
    {
      "id": 1,git
      "title": "네이버 북마크",
      "url": "https://www.naver.com",
      "description": "네이버",
      "createdAt": "2024-05-22T09:41:12.000Z",
      "updatedAt": "2024-05-22T09:41:12.000Z"
    }`,
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookmarkService.findOne(+id);
  }

  @ApiBody({
    schema: {
      example: {
        title: '북마크 1',
        url: 'https://www.naver.com',
        description: '네이버',
      },
    },
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookmarkDto: UpdateBookmarkDto) {
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
