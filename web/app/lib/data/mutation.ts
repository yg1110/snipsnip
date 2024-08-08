import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  addBookmark,
  addFolder,
  deleteBookmark,
  deleteFolder,
  login,
  register,
  updateBookmark,
  updateBookmarksOrder,
  updateFolder,
  updateRootFoldersOrder,
  updateSubFoldersOrder,
} from '@/app/lib/data/fetchingData';
import {
  Bookmark,
  ModifiedBookmark,
  ModifiedFolder,
  NewBookmark,
  NewFolder,
  UpdateBookmarksOrderCommand,
  UpdateRootFoldersOrderCommand,
  UpdateSubFoldersOrderCommand,
} from '@/app/lib/types/dataTypes';
import { LoginRequest, RegisterRequest } from '../types/authTypes';
import { message } from 'antd';

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

export const useLogin = () => {
  return useMutation({
    mutationFn: (command: LoginRequest) => {
      return login(command);
    },
    onError: error => {
      const errorMessage = error?.message || '로그인에 실패했습니다.';
      message.error(errorMessage);
    },
  });
};

export const useRegister = () => {
  return useMutation({
    mutationFn: (command: RegisterRequest) => {
      return register(command);
    },
    onError: error => {
      const errorMessage = error?.message || '회원가입에 실패했습니다.';
      message.error(errorMessage);
    },
  });
};

export const useAddBookmark = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newBookmark: NewBookmark) => {
      return addBookmark(newBookmark);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['bookmarks'] }),
    onError: error => {
      const errorMessage = error?.message || '북마크 생성에 실패했습니다.';
      message.error(errorMessage);
    },
  });
};

export const useUpdateBookmark = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (modifiedBookmark: ModifiedBookmark) => {
      return updateBookmark(modifiedBookmark);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['bookmarks'] }),
    onError: error => {
      const errorMessage = error?.message || '북마크 수정에 실패했습니다.';
      message.error(errorMessage);
    },
  });
};

export const useDeleteBookmark = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (bookmarkId: number) => {
      return deleteBookmark(bookmarkId);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['bookmarks'] }),
    onError: error => {
      const errorMessage = error?.message || '북마크 삭제에 실패했습니다.';
      message.error(errorMessage);
    },
  });
};

export const useUpdateBookmarksOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (command: UpdateBookmarksOrderCommand) => {
      return updateBookmarksOrder(command.folderId, command.bookmarkList);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['bookmarks'] }),
    onError: error => {
      const errorMessage = error?.message || '북마크 순서 변경에 실패했습니다.';
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
