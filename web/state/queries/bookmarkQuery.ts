import { useQuery } from '@tanstack/react-query';
import { Bookmark } from '@/app/lib/types/dataTypes';
import { message } from 'antd';
import { ApiError } from '@/shared/ApiError';
import { fetchBookmarks } from '@/services/folders/bookmarkApi';

export const useBookmarks = (parentFolderId: number) => {
  return useQuery<Bookmark[]>({
    queryKey: ['bookmarks', parentFolderId],
    queryFn: () => fetchBookmarks(parentFolderId),
    refetchOnWindowFocus: false,
    retry(failureCount, error) {
      if (error instanceof ApiError) {
        const errorMessage =
          error?.message || '북마크 목록을 불러오는데 실패했습니다.';
        message.error(errorMessage);
        return false;
      }
      return failureCount < 3;
    },
  });
};
