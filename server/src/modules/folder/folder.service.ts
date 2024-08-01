import {
  forwardRef,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BookmarkService } from '../bookmark/bookmark.service';
import { CreateFolderDto, UpdateFolderDto } from './dto/foler.dto';
import { Folder } from './entities/folder.entity';

@Injectable()
export class FolderService {
  constructor(
    @InjectRepository(Folder)
    private readonly folderRepository: Repository<Folder>,
    @Inject(forwardRef(() => BookmarkService))
    private readonly bookmarkService: BookmarkService,
  ) {}

  async create(createFolderDto: CreateFolderDto): Promise<Folder> {
    try {
      if (createFolderDto.parentFolderId) {
        const parentFolder = await this.folderRepository.findOne({
          where: { id: createFolderDto.parentFolderId },
        });
        if (!parentFolder) {
          throw new NotFoundException('부모 폴더를 찾을 수 없습니다.');
        }
      }

      const folder = await this.folderRepository
        .createQueryBuilder('folder')
        .select()
        .where('folder.userId = :userId', { userId: createFolderDto.userId })
        .andWhere('folder.name = :name', { name: createFolderDto.name })
        .andWhere('folder.deletedAt IS NULL')
        .getOne();

      if (folder) {
        throw new InternalServerErrorException('이미 존재하는 폴더입니다.');
      }
      return this.folderRepository.save(createFolderDto);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findSubFolderCount(userId: number, parentFolderId: number): Promise<number> {
    return this.folderRepository
      .createQueryBuilder('folder')
      .select()
      .where('folder.userId = :userId', { userId })
      .andWhere('folder.parentFolderId = :parentFolderId', { parentFolderId })
      .andWhere('folder.deletedAt IS NULL')
      .getCount();
  }

  async findAllRoot(userId: number): Promise<Folder[]> {
    const folders = await this.folderRepository
      .createQueryBuilder('folder')
      .select()
      .where('folder.userId = :userId', { userId })
      .andWhere('folder.parentFolderId IS NULL')
      .andWhere('folder.deletedAt IS NULL')
      .orderBy('folder.order', 'ASC')
      .getMany();

    const folderWithCount = await Promise.all(
      folders.map(async (folder) => {
        const subFolderCount = await this.findSubFolderCount(userId, folder.id);
        const bookmarkCount = await this.bookmarkService.findBookmarkCount(userId, folder.id);
        return {
          ...folder,
          subFolderCount,
          bookmarkCount,
        };
      }),
    );

    return folderWithCount;
  }

  async findSubFolders(parentFolderId: number, userId: number): Promise<Folder[]> {
    const subFolders = await this.folderRepository
      .createQueryBuilder('folder')
      .select()
      .where('folder.userId = :userId', { userId })
      .andWhere('folder.parentFolderId = :parentFolderId', { parentFolderId })
      .andWhere('folder.deletedAt IS NULL')
      .orderBy('folder.order', 'ASC')
      .getMany();

    const subFolderWithCount = await Promise.all(
      subFolders.map(async (folder) => {
        const bookmarkCount = await this.bookmarkService.findBookmarkCount(userId, folder.id);
        return {
          ...folder,
          subFolderCount: 0,
          bookmarkCount,
        };
      }),
    );

    return subFolderWithCount;
  }

  async findOne(id: number, userId: number): Promise<Folder> {
    return this.folderRepository
      .createQueryBuilder('folder')
      .select()
      .where('folder.userId = :userId', { userId })
      .andWhere('folder.id = :id', { id })
      .andWhere('folder.deletedAt IS NULL')
      .getOne();
  }

  async update(id: number, userId: number, updateFolderDto: UpdateFolderDto): Promise<Folder> {
    try {
      const folder = await this.folderRepository
        .createQueryBuilder('folder')
        .select()
        .where('folder.userId = :userId', { userId })
        .andWhere('folder.id = :id', { id })
        .andWhere('folder.deletedAt IS NULL')
        .getOne();

      if (!folder) {
        throw new NotFoundException('폴더를 찾을 수 없습니다.');
      }
      if (updateFolderDto.name !== null) {
        folder.name = updateFolderDto.name;
      }
      if (updateFolderDto.parentFolderId !== null) {
        folder.parentFolderId = updateFolderDto.parentFolderId;
      }
      if (updateFolderDto.order !== null) {
        folder.order = updateFolderDto.order;
      }
      await this.folderRepository.save(folder);
      return this.folderRepository.findOne({ where: { id } });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async remove(id: number, userId: number): Promise<{ status: number; message: string }> {
    try {
      const folder = await this.folderRepository
        .createQueryBuilder('folder')
        .select()
        .where('folder.userId = :userId', { userId })
        .andWhere('folder.id = :id', { id })
        .andWhere('folder.deletedAt IS NULL')
        .getOne();
      if (!folder) {
        throw new NotFoundException('폴더를 찾을 수 없습니다.');
      }
      await this.bookmarkService.clearAllBookmarkWithId(id);
      await this.folderRepository.update(id, { deletedAt: new Date() });
      return { status: 204, message: '폴더를 삭제했습니다.' };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
