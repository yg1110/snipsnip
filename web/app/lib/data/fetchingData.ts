import {
  Bookmark,
  Folder,
  ModifiedBookmark,
  ModifiedFolder,
  NewBookmark,
  NewFolder,
} from "@/app/lib/types/dataTypes";
import generateApiClientFetcher from "../generateApiClientFetcher";
import {
  AuthTokensResponse,
  LoginRequest,
  RegisterRequest,
  User,
} from "../types/authTypes";

const apiClient = generateApiClientFetcher(process.env.NEXT_PUBLIC_BASE_API, {
  "Content-Type": "application/json",
  credentials: "include",
});

export const fetchRootFolders = async () => {
  return apiClient<Folder[]>("/folders", {
    method: "GET",
  });
};

export const fetchChildFolders = async (parentFolderId: number) => {
  return apiClient<Folder[]>(`/folders/${parentFolderId}`, {
    method: "GET",
  });
};

export const addFolder = async (newFolder: NewFolder) => {
  return apiClient<Folder>("/folders", {
    method: "POST",
    body: JSON.stringify(newFolder),
  });
};

export const updateFolder = async (modifiedFolder: ModifiedFolder) => {
  return apiClient<Folder>(`/folders/${modifiedFolder.id}`, {
    method: "PATCH",
    body: JSON.stringify(modifiedFolder),
  });
};

export const deleteFolder = async (folderId: number) => {
  return apiClient<void>(`/folders/${folderId}`, {
    method: "DELETE",
  });
};

export const fetchBookmarks = async (folderId: number) => {
  return apiClient<Bookmark[]>(`/bookmarks/${folderId}`, {
    method: "GET",
  });
};

export const login = async (command: LoginRequest) => {
  return apiClient<AuthTokensResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify(command),
  });
};

export const register = async (command: RegisterRequest) => {
  const { passwordConfirm, ...rest } = command;
  return apiClient<User>("/users/register", {
    method: "POST",
    body: JSON.stringify(rest),
  });
};

export const addBookmark = async (newBookmark: NewBookmark) => {
  return apiClient<Bookmark>("/bookmarks", {
    method: "POST",
    body: JSON.stringify(newBookmark),
  });
};

export const updateBookmark = async (modifiedBookmark: ModifiedBookmark) => {
  return apiClient<Bookmark>(`/bookmarks/${modifiedBookmark.id}`, {
    method: "PATCH",
    body: JSON.stringify(modifiedBookmark),
  });
};

export const deleteBookmark = async (bookmarkId: number) => {
  return apiClient<void>(`/bookmarks/${bookmarkId}`, {
    method: "DELETE",
  });
};
