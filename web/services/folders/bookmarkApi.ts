import { Bookmark, ModifiedBookmark, NewBookmark } from '@/types/bookmarkTypes';
import generateApiClientFetcher from '@/services/generateApiClientFetcher';
const apiClient = generateApiClientFetcher(process.env.NEXT_PUBLIC_BASE_API, {
  'Content-Type': 'application/json',
  credentials: 'include',
});

export const fetchBookmarks = async (folderId: number) => {
  return apiClient<Bookmark[]>(`/bookmarks/${folderId}`, {
    method: 'GET',
  });
};

export const addBookmark = async (newBookmark: NewBookmark) => {
  return apiClient<Bookmark>('/bookmarks', {
    method: 'POST',
    body: JSON.stringify(newBookmark),
  });
};

export const updateBookmark = async (modifiedBookmark: ModifiedBookmark) => {
  return apiClient<Bookmark>(`/bookmarks/${modifiedBookmark.id}`, {
    method: 'PATCH',
    body: JSON.stringify(modifiedBookmark),
  });
};

export const deleteBookmark = async (bookmarkId: number) => {
  return apiClient<void>(`/bookmarks/${bookmarkId}`, {
    method: 'DELETE',
  });
};

export const updateBookmarksOrder = async (
  folderId: number,
  bookmarkList: Bookmark[],
) => {
  return apiClient<void>('/bookmarks/order', {
    method: 'POST',
    body: JSON.stringify({
      folderId,
      bookmarkList,
    }),
  });
};
