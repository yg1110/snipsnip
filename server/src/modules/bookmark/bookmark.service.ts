import {
  forwardRef,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { FolderService } from '../folder/folder.service';
import { MetadataService } from '../metadata/metadata.service';
import { CreateBookmarkDto, UpdateBookmarkDto } from './dto/bookmark.dto';
import { Bookmark } from './entities/bookmark.entity';

@Injectable()
export class BookmarkService {
  constructor(
    @InjectRepository(Bookmark)
    private readonly bookmarkRepository: Repository<Bookmark>,
    @Inject(forwardRef(() => FolderService))
    private readonly folderService: FolderService,
    @Inject(forwardRef(() => MetadataService))
    private readonly metadataService: MetadataService,
  ) {}

  async create(createBookmarkDto: CreateBookmarkDto) {
    const folder = await this.folderService.findOne(createBookmarkDto.folderId);
    if (!folder) {
      throw new NotFoundException('폴더를 찾을 수 없습니다.');
    }
    try {
      const metadata = await this.metadataService.create({ url: createBookmarkDto.url });
      return this.bookmarkRepository.save({
        ...createBookmarkDto,
        metadata,
      });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findAllByFolderId(folderId: number): Promise<Bookmark[]> {
    return await this.bookmarkRepository
      .createQueryBuilder('bookmark')
      .leftJoinAndSelect('bookmark.metadata', 'metadata')
      .where('bookmark.folderId = :folderId', { folderId })
      .andWhere('bookmark.deletedAt IS NULL')
      .orderBy('bookmark.order', 'ASC')
      .getMany();
  }

  async findOne(id: number): Promise<Bookmark> {
    const bookmark = await this.bookmarkRepository
      .createQueryBuilder('bookmark')
      .leftJoinAndSelect('bookmark.metadata', 'metadata')
      .where('bookmark.id = :id', { id })
      .andWhere('bookmark.deletedAt IS NULL')
      .orderBy('bookmark.order', 'ASC')
      .getOne();
    if (!bookmark) {
      throw new NotFoundException('북마크를 찾을 수 없습니다.');
    }
    return bookmark;
  }

  async update(id: number, updateBookmarkDto: UpdateBookmarkDto): Promise<Bookmark> {
    try {
      const bookmark = await this.bookmarkRepository
        .createQueryBuilder('bookmark')
        .leftJoinAndSelect('bookmark.metadata', 'metadata')
        .where('bookmark.id = :id', { id })
        .andWhere('bookmark.deletedAt IS NULL')
        .getOne();

      if (!bookmark) {
        throw new NotFoundException('북마크를 찾을 수 없습니다.');
      }
      if (updateBookmarkDto.url !== null) {
        const metadata = await this.metadataService.create({
          url: updateBookmarkDto.url,
        });
        bookmark.metadata = metadata;
      }
      if (updateBookmarkDto.title !== null) {
        bookmark.title = updateBookmarkDto.title;
      }
      if (updateBookmarkDto.folderId !== null) {
        bookmark.folderId = updateBookmarkDto.folderId;
      }
      if (updateBookmarkDto.order !== null) {
        bookmark.order = updateBookmarkDto.order;
      }
      await this.bookmarkRepository.save(bookmark);
      return this.findOne(id);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async remove(id: number): Promise<{ status: number; message: string }> {
    try {
      const bookmark = await this.bookmarkRepository
        .createQueryBuilder('bookmark')
        .leftJoinAndSelect('bookmark.metadata', 'metadata')
        .where('bookmark.id = :id', { id })
        .andWhere('bookmark.deletedAt IS NULL')
        .getOne();
      if (!bookmark) {
        throw new NotFoundException('북마크를 찾을 수 없습니다.');
      }
      await this.bookmarkRepository.update(id, { deletedAt: new Date() });
      return { status: 204, message: '북마크를 삭제했습니다.' };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async clearAllBookmarkWithId(id: number): Promise<void> {
    try {
      await this.bookmarkRepository
        .createQueryBuilder()
        .update()
        .set({ deletedAt: new Date() })
        .where('folderId = :folderId', { folderId: id })
        .execute();
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
