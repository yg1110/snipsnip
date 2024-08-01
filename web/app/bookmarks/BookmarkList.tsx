import { List } from 'antd';
import { useBookmarks } from '@/app/lib/data/query';
import BookmarkItem from './BookmarkItem';

export default function BookmarkList({ folderId }: { folderId: number }) {
  const { data: bookmarks, isLoading: isBookmarksLoading } =
    useBookmarks(folderId);

  return (
    <>
      {bookmarks?.length ? (
        <List
          itemLayout="horizontal"
          dataSource={bookmarks}
          loading={isBookmarksLoading}
          renderItem={item => <BookmarkItem bookmark={item} />}
        />
      ) : null}
    </>
  );
}
