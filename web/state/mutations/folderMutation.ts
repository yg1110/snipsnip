import { useMutation, useQueryClient } from '@tanstack/react-query';

import {
  ModifiedFolder,
  NewFolder,
  UpdateRootFoldersOrderCommand,
  UpdateSubFoldersOrderCommand,
} from '@/app/lib/types/dataTypes';
import { message } from 'antd';
import {
  addFolder,
  deleteFolder,
  updateFolder,
  updateRootFoldersOrder,
  updateSubFoldersOrder,
} from '@/services/folders/folderApi';

export const useAddFolder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newFolder: NewFolder) => {
      return addFolder(newFolder);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rootFolders'] });
      queryClient.invalidateQueries({ queryKey: ['childFolders'] });
    },
    onError: error => {
      const errorMessage = error?.message || '폴더 생성에 실패했습니다.';
      message.error(errorMessage);
    },
  });
};

export const useUpdateFolder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (modifiedFolder: ModifiedFolder) => {
      return updateFolder(modifiedFolder);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rootFolders'] });
      queryClient.invalidateQueries({ queryKey: ['childFolders'] });
    },
    onError: error => {
      const errorMessage = error?.message || '폴더 수정에 실패했습니다.';
      message.error(errorMessage);
    },
  });
};

export const useDeleteFolder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (folderId: number) => {
      return deleteFolder(folderId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rootFolders'] });
      queryClient.invalidateQueries({ queryKey: ['childFolders'] });
    },
    onError: error => {
      const errorMessage = error?.message || '폴더 삭제에 실패했습니다.';
      message.error(errorMessage);
    },
  });
};

export const useUpdateSubFoldersOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (command: UpdateSubFoldersOrderCommand) => {
      return updateSubFoldersOrder(command.parentFolderId, command.folderList);
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['childFolders'] }),
    onError: error => {
      const errorMessage = error?.message || '폴더 순서 변경에 실패했습니다.';
      message.error(errorMessage);
    },
  });
};

export const useUpdateRootFoldersOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (command: UpdateRootFoldersOrderCommand) => {
      return updateRootFoldersOrder(command.folderList);
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['rootFolders'] }),
    onError: error => {
      const errorMessage = error?.message || '폴더 순서 변경에 실패했습니다.';
      message.error(errorMessage);
    },
  });
};
