import { Nullable } from './commonTypes';

export type Folder = {
  id: number;
  name: string;
  order: number;
  parentFolderId: Nullable<number>;
  subFolderCount: number;
  bookmarkCount: number;
  createdAt: Nullable<Date>;
  updatedAt: Nullable<Date>;
  deletedAt: Nullable<Date>;
};

export type NewFolder = Pick<Folder, 'name' | 'parentFolderId'>;

export type ModifiedFolder = Partial<Folder>;

export type UpdateSubFoldersOrderCommand = {
  parentFolderId: number;
  folderList: Folder[];
};

export type UpdateRootFoldersOrderCommand = {
  folderList: Folder[];
};
