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

  findAll(): Promise<Metadata[]> {
    return this.metadataRepository.createQueryBuilder('metadata').select().getMany();
  }

  findOne(id: number): Promise<Metadata> {
    return this.metadataRepository.findOne({ where: { id } });
  }

  findOneByUrl(url: string): Promise<Metadata> {
    return this.metadataRepository.findOneBy({ url });
  }
}
