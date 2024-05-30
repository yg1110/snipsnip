export class CreateFolderDto {
  name: string;
  parentFolderId: number | null;
  order: number;
}
export class UpdateFolderDto {
  name: string | null;
  parentFolderId: number | null;
  order: number | null;
}
