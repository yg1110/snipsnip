import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateBookmarkDto, UpdateBookmarkDto } from './dto/bookmark.dto';
import { Bookmark } from './entities/bookmark.entity';

@Injectable()
export class BookmarkService {
  constructor(
    @InjectRepository(Bookmark)
    private readonly bookmarkRepository: Repository<Bookmark>,
  ) {}

  create(createBookmarkDto: CreateBookmarkDto): Promise<Bookmark> {
    const bookmark = this.bookmarkRepository.create(createBookmarkDto);
    bookmark.createdAt = new Date();
    bookmark.updatedAt = new Date();
    return this.bookmarkRepository.save(bookmark);
  }

  findAll(): Promise<Bookmark[]> {
    return this.bookmarkRepository.find();
  }

  findOne(id: number): Promise<Bookmark> {
    return this.bookmarkRepository.findOne({ where: { id } });
  }

  async update(id: number, updateBookmarkDto: UpdateBookmarkDto): Promise<Bookmark> {
    await this.bookmarkRepository.update(id, {
      ...updateBookmarkDto,
      updatedAt: new Date(),
    });
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.bookmarkRepository.delete(id);
  }
}
