import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CrawlerService } from './crawler.service';

@ApiTags('crawler')
@Controller('crawler')
export class CrawlerController {
  constructor(private readonly crawlerService: CrawlerService) {}

  @Get('html')
  async getHtml(@Query('url') url: string): Promise<{ data: string }> {
    return this.crawlerService.getHtml(url);
  }
}
