import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

import { CreateMetadataDto } from './dto/metadata.dto';
import { MetadataService } from './metadata.service';

@ApiTags('Metadatas')
@Controller('metadata')
export class MetadataController {
  constructor(private readonly metadataService: MetadataService) {}

  @ApiOperation({
    summary: '메타데이터 생성하기',
  })
  @ApiBody({
    schema: {
      example: {
        url: 'https://naver.com',
      },
    },
  })
  @Post()
  create(@Body() createMetadataDto: CreateMetadataDto) {
    return this.metadataService.create(createMetadataDto);
  }

  @ApiOperation({
    summary: '메타데이터 전체 조회하기',
  })
  @Get()
  findAll() {
    return this.metadataService.findAll();
  }

  @ApiOperation({
    summary: '메타데이터 상세 조회하기',
  })
  @Get(':id')
  findOne(@Param('url') id: number) {
    return this.metadataService.findOne(id);
  }

  @ApiOperation({
    summary: '메타데이터 상세 조회하기',
  })
  @Get(':url')
  findOneByUrl(@Param('url') url: string) {
    return this.metadataService.findOneByUrl(url);
  }
}
