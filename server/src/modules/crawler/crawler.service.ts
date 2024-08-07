import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as cheerio from 'cheerio';

@Injectable()
export class CrawlerService {
  async getHtml(url: string): Promise<{ data: string }> {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    return {
      data: $.html(),
    };
  }
}
