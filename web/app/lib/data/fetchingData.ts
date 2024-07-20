import {
  Bookmark,
  Folder,
  ModifiedFolder,
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
  try {
    const response = await apiClient<Folder[]>("/folders", {
      method: "GET",
    });
    return response;
  } catch (error) {
    throw new Error("Network response was not ok");
  }
};

export const fetchChildFolders = async (parentFolderId: number) => {
  try {
    const response = await apiClient<Folder[]>(`/folders/${parentFolderId}`, {
      method: "GET",
    });
    return response;
  } catch (error) {
    throw new Error("Network response was not ok");
  }
};

export const addFolder = async (newFolder: NewFolder) => {
  try {
    const response = await apiClient<Folder>(`/folders`, {
      method: "POST",
      body: JSON.stringify(newFolder),
    });
    return response;
  } catch (error) {
    throw new Error("Network response was not ok");
  }
};

export const updateFolder = async (modifiedFolder: ModifiedFolder) => {
  try {
    const response = await apiClient<Folder>(`/folders/${modifiedFolder.id}`, {
      method: "PATCH",
      body: JSON.stringify(modifiedFolder),
    });
    return response;
  } catch (error) {
    throw new Error("Network response was not ok");
  }
};

export const deleteFolder = async (folderId: number) => {
  try {
    const response = await apiClient<void>(`/folders/${folderId}`, {
      method: "DELETE",
    });
    return response;
  } catch (error) {
    throw new Error("Network response was not ok");
  }
};

export const fetchBookmarks = async (folderId: number) => {
  try {
    const response = await apiClient<Bookmark[]>(`/bookmarks/${folderId}`, {
      method: "GET",
    });
    return response;
  } catch (error) {
    throw new Error("Network response was not ok");
  }
};

export const login = async (command: LoginRequest) => {
  try {
    const response = await apiClient<AuthTokensResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify(command),
    });
    return response;
  } catch (error) {
    throw new Error("Network response was not ok");
  }
};

export const register = async (command: RegisterRequest) => {
  const { passwordConfirm, ...rest } = command;
  try {
    const response = await apiClient<User>("/users/register", {
      method: "POST",
      body: JSON.stringify(rest),
    });
    return response;
  } catch (error) {
    throw new Error("Network response was not ok");
  }
};
