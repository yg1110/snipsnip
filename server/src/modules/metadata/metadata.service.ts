import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import * as cheerio from 'cheerio';
import { Repository } from 'typeorm';

import { CreateMetadataDto } from './dto/metadata.dto';
import { Metadata } from './entities/metadata.entity';

@Injectable()
export class MetadataService {
  constructor(
    @InjectRepository(Metadata)
    private readonly metadataRepository: Repository<Metadata>,
  ) {}

  async fetchMetadata(url: string): Promise<Metadata> {
    try {
      const { data } = await axios.get(url);
      const $ = cheerio.load(data);
      const title = $('meta[property="og:title"]').attr('content') || $('title').text();
      const description =
        $('meta[property="og:description"]').attr('content') ||
        $('meta[name="description"]').attr('content');
      const thumbnail = $('meta[property="og:image"]').attr('content');
      return this.metadataRepository.create({
        url,
        title,
        description,
        thumbnail,
      });
    } catch (error) {
      // CSRF 적용된 URL 예외처리
      return this.metadataRepository.create({
        url,
        title: '',
        description: '',
        thumbnail: '',
      });
    }
  }

  async create(createMetadataDto: CreateMetadataDto): Promise<Metadata> {
    try {
      const metadata = await this.metadataRepository.findOne({
        where: { url: createMetadataDto.url },
      });
      if (metadata) return metadata;
      return this.metadataRepository.save(await this.fetchMetadata(createMetadataDto.url));
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findAll(): Promise<Metadata[]> {
    return await this.metadataRepository.createQueryBuilder('metadata').select().getMany();
  }

  async findOne(id: number): Promise<Metadata> {
    return await this.metadataRepository.findOne({ where: { id } });
  }

  async findOneByUrl(url: string): Promise<Metadata> {
    return await this.metadataRepository.findOneBy({ url });
  }

  async updateAllMetadata(): Promise<Metadata[]> {
    const metadataList = await this.findAll();
    const urlList = metadataList.map((metadata) => metadata.url);
    const promise = urlList.map(async (url) => {
      const metadata = await this.fetchMetadata(url);
      return this.metadataRepository.update({ url }, metadata);
    });
    await Promise.all(promise);
    return metadataList;
  }
}
