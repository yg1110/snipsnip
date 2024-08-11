import { Folder, ModifiedFolder, NewFolder } from '@/types/folderTypes';
import generateApiClientFetcher from '@/services/generateApiClientFetcher';

const apiClient = generateApiClientFetcher(process.env.NEXT_PUBLIC_BASE_API, {
  'Content-Type': 'application/json',
  credentials: 'include',
});

export const fetchRootFolders = async () => {
  return apiClient<Folder[]>('/folders', {
    method: 'GET',
  });
};

export const fetchAllFolders = async () => {
  return apiClient<Folder[]>('/folders/all', {
    method: 'GET',
  });
};

export const fetchChildFolders = async (parentFolderId: number) => {
  return apiClient<Folder[]>(`/folders/${parentFolderId}`, {
    method: 'GET',
  });
};

export const fetchFolder = async (folderId: number) => {
  return apiClient<Folder>(`/folder/${folderId}`, {
    method: 'GET',
  });
};

export const addFolder = async (newFolder: NewFolder) => {
  return apiClient<Folder>('/folders', {
    method: 'POST',
    body: JSON.stringify(newFolder),
  });
};

export const updateFolder = async (modifiedFolder: ModifiedFolder) => {
  return apiClient<Folder>(`/folders/${modifiedFolder.id}`, {
    method: 'PATCH',
    body: JSON.stringify(modifiedFolder),
  });
};

export const deleteFolder = async (folderId: number) => {
  return apiClient<void>(`/folders/${folderId}`, {
    method: 'DELETE',
  });
};
export const updateSubFoldersOrder = async (
  parentFolderId: number,
  folderList: Folder[],
) => {
  return apiClient<void>('/sub-folders/order', {
    method: 'POST',
    body: JSON.stringify({
      parentFolderId,
      folderList,
    }),
  });
};

export const updateRootFoldersOrder = async (folderList: Folder[]) => {
  return apiClient<void>('/root-folders/order', {
    method: 'POST',
    body: JSON.stringify({
      folderList,
    }),
  });
};
