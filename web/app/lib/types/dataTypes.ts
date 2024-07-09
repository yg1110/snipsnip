type Nullable<T> = T | null;

export type Folder = {
  id: number;
  name: string;
  order: number;
  parentFolderId: Nullable<number>;
  createdAt: Nullable<Date>;
  updatedAt: Nullable<Date>;
  deletedAt: Nullable<Date>;
};

export type NewFolder = Pick<Folder, "name" | "order" | "parentFolderId">;

export type ModifiedFolder = Partial<Folder>;
