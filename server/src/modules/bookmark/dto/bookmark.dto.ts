export class CreateBookmarkDto {
  title: string;
  url: string;
  description?: string;
}
export class UpdateBookmarkDto {
  title?: string;
  url?: string;
  description?: string;
}
