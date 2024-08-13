import { useQuery } from '@tanstack/react-query';
import { message } from 'antd';

import { fetchBookmark, fetchBookmarks } from '@/services/api/bookmarkApi';
import { ApiError } from '@/shared/ApiError';
import { Bookmark } from '@/types/bookmarkTypes';

export const useBookmarks = (parentFolderId: number) => {
  return useQuery<Bookmark[]>({
    queryKey: ['bookmarks', parentFolderId],
    queryFn: () => fetchBookmarks(parentFolderId),
    refetchOnWindowFocus: false,
    retry(failureCount, error) {
      if (error instanceof ApiError) {
        const errorMessage = error?.message || '북마크 목록을 불러오는데 실패했습니다.';
        message.error(errorMessage);
        return false;
      }
      return failureCount < 3;
    },
  });
};

export const useBookmark = (bookmarkId: number) => {
  return useQuery<Bookmark>({
    queryKey: ['bookmark', bookmarkId],
    queryFn: () => fetchBookmark(bookmarkId),
    refetchOnWindowFocus: false,
    retry(failureCount, error) {
      if (error instanceof ApiError) {
        const errorMessage = error?.message || '북마크를 불러오는데 실패했습니다.';
        message.error(errorMessage);
        return false;
      }
      return failureCount < 3;
    },
  });
};
