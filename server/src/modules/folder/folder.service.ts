import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateFolderDto } from './dto/foler.dto';
import { Folder } from './entities/folder.entity';

@Injectable()
export class FolderService {
  constructor(
    @InjectRepository(Folder)
    private folderRepository: Repository<Folder>,
  ) {}

  async create(createFolderDto: CreateFolderDto): Promise<Folder> {
    if (createFolderDto.parentFolderId) {
      const parentFolder = await this.folderRepository.findOne({
        where: { id: createFolderDto.parentFolderId },
      });
      if (!parentFolder) {
        throw new NotFoundException('부모 폴더를 찾을 수 없습니다.');
      }
    }
    return this.folderRepository.save(createFolderDto);
  }
}
