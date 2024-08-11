import { List } from 'antd';
import { useBookmarks } from '@/app/lib/data/query';
import BookmarkItem from './BookmarkItem';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useEffect, useState } from 'react';
import { Bookmark } from '../../app/lib/types/dataTypes';
import { useUpdateBookmarksOrder } from '../../app/lib/data/mutation';

export default function BookmarkList({ folderId }: { folderId: number }) {
  const [bookmarkList, setBookmarkList] = useState<Bookmark[]>([]);
  const { data: bookmarks, isLoading: isBookmarksLoading } =
    useBookmarks(folderId);
  const updateBookmarksOrderMutation = useUpdateBookmarksOrder();

  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (active.id !== over?.id) {
      const activeIndex = bookmarkList.findIndex(
        record => record.id === +active.id,
      );
      const overIndex = bookmarkList.findIndex(
        record => record.id === +(over?.id || 0),
      );
      const updatedList = arrayMove(bookmarkList, activeIndex, overIndex);
      setBookmarkList(updatedList);
      updateBookmarksOrder(updatedList);
    }
  };

  const updateBookmarksOrder = (bookmarkList: Bookmark[]) => {
    updateBookmarksOrderMutation.mutate({
      folderId,
      bookmarkList: bookmarkList,
    });
  };

  useEffect(() => {
    if (bookmarks) {
      setBookmarkList(bookmarks);
    }
  }, [bookmarks]);

  return (
    <>
      {bookmarkList?.length ? (
        <DndContext modifiers={[restrictToVerticalAxis]} onDragEnd={onDragEnd}>
          <SortableContext
            items={bookmarkList.map(i => i.id.toString())}
            strategy={verticalListSortingStrategy}
          >
            <List
              itemLayout="horizontal"
              dataSource={bookmarkList}
              loading={isBookmarksLoading}
              renderItem={item => <BookmarkItem bookmark={item} />}
            />
          </SortableContext>
        </DndContext>
      ) : null}
    </>
  );
}
