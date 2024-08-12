import { Bookmark } from '../entities/bookmark.entity';

export class CreateBookmarkDto {
  title: string | null;
  contents: string;
  url: string;
  userId: number;
  folderId: number;
  order: number;
}
export class UpdateBookmarkDto {
  title: string | null;
  contents: string | null;
  url: string | null;
  folderId: number | null;
  order: number | null;
}

export class UpdateBookmarksOrderDto {
  folderId: number;
  bookmarkList: Bookmark[];
}
