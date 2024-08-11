import { useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';

import { addBookmark, deleteBookmark, updateBookmark, updateBookmarksOrder } from '@/services/folders/bookmarkApi';
import { ModifiedBookmark, NewBookmark, UpdateBookmarksOrderCommand } from '@/types/bookmarkTypes';

export const useAddBookmark = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newBookmark: NewBookmark) => {
      return addBookmark(newBookmark);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['bookmarks'] }),
    onError: (error) => {
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
    onError: (error) => {
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
    onError: (error) => {
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
    onError: (error) => {
      const errorMessage = error?.message || '북마크 순서 변경에 실패했습니다.';
      message.error(errorMessage);
    },
  });
};
