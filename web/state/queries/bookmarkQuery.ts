import { useQuery } from '@tanstack/react-query';
import { message } from 'antd';

import { fetchBookmarks } from '@/services/folders/bookmarkApi';
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
