export class CreateBookmarkDto {
  title: string;
  url: string;
  folderId: number;
  thumbnail: string | null;
  order: number;
}
export class UpdateBookmarkDto {
  title: string;
  url: string;
  folderId: number;
  thumbnail: string | null;
  order: number;
}
