type Nullable<T> = T | null;

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

export type NewFolder = Pick<Folder, 'name' | 'order' | 'parentFolderId'>;

export type ModifiedFolder = Partial<Folder>;

export type Metadata = {
  id: number;
  url: string;
  title: Nullable<string>;
  thumbnail: Nullable<string>;
  description: Nullable<string>;
};

export type Bookmark = {
  id: number;
  folderId: number;
  metadataId: number;
  title: string;
  order: number;
  createdAt: Nullable<Date>;
  updatedAt: Nullable<Date>;
  deletedAt: Nullable<Date>;
  metadata: Metadata;
};

export type NewBookmark = Pick<Bookmark, 'title' | 'folderId' | 'order'> & {
  url: string;
};

export type ModifiedBookmark = Partial<Bookmark>;
