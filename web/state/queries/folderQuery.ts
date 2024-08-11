import { useQuery } from '@tanstack/react-query';
import { message } from 'antd';

import { fetchAllFolders, fetchChildFolders, fetchFolder, fetchRootFolders } from '@/services/folders/folderApi';
import { ApiError } from '@/shared/ApiError';
import { Folder } from '@/types/folderTypes';

export const useRootFolders = () => {
  return useQuery<Folder[]>({
    queryKey: ['rootFolders'],
    queryFn: fetchRootFolders,
    refetchOnWindowFocus: false,
    retry(failureCount, error) {
      if (error instanceof ApiError) {
        const errorMessage = error?.message || '폴더 목록을 불러오는데 실패했습니다.';
        message.error(errorMessage);
        return false;
      }
      return failureCount < 3;
    },
  });
};

export const useAllFolders = () => {
  return useQuery<Folder[]>({
    queryKey: ['allFolders'],
    queryFn: fetchAllFolders,
    refetchOnWindowFocus: false,
    retry(failureCount, error) {
      if (error instanceof ApiError) {
        const errorMessage = error?.message || '폴더 목록을 불러오는데 실패했습니다.';
        message.error(errorMessage);
        return false;
      }
      return failureCount < 3;
    },
  });
};

export const useChildFolders = (parentFolderId: number) => {
  return useQuery<Folder[]>({
    queryKey: ['childFolders', parentFolderId],
    queryFn: () => fetchChildFolders(parentFolderId),
    refetchOnWindowFocus: false,
    retry(failureCount, error) {
      if (error instanceof ApiError) {
        const errorMessage = error?.message || '하위 폴더 목록을 불러오는데 실패했습니다.';
        message.error(errorMessage);
        return false;
      }
      return failureCount < 3;
    },
  });
};

export const useFolder = (folderId: number) => {
  return useQuery<Folder>({
    queryKey: ['folder', folderId],
    queryFn: () => fetchFolder(folderId),
    refetchOnWindowFocus: false,
    retry(failureCount, error) {
      if (error instanceof ApiError) {
        const errorMessage = error?.message || '폴더 정보를 불러오는데 실패했습니다.';
        message.error(errorMessage);
        return false;
      }
      return failureCount < 3;
    },
  });
};
