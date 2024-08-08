import { Folder } from '../entities/folder.entity';

export class CreateFolderDto {
  name: string;
  parentFolderId: number | null;
  userId: number;
  order: number;
}
export class UpdateFolderDto {
  name: string | null;
  parentFolderId: number | null;
  order: number | null;
}

export class UpdateSubFoldersOrderDto {
  parentFolderId: number;
  folderList: Folder[];
}

export class UpdateRootFoldersOrderDto {
  folderList: Folder[];
}
