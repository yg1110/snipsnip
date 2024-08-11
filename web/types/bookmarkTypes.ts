import { Nullable } from './commonTypes';

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

export type NewBookmark = Pick<Bookmark, 'title' | 'folderId'> & {
  url: string;
};

export type ModifiedBookmark = Partial<Bookmark>;

export type UpdateBookmarksOrderCommand = {
  folderId: number;
  bookmarkList: Bookmark[];
};
