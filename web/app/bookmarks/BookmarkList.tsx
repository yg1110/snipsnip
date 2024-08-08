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
import { Bookmark } from '../lib/types/dataTypes';
import { useUpdateBookmarkOrder } from '../lib/data/mutation';

export default function BookmarkList({ folderId }: { folderId: number }) {
  const [bookmarkList, setBookmarkList] = useState<Bookmark[]>([]);
  const { data: bookmarks, isLoading: isBookmarksLoading } =
    useBookmarks(folderId);
  const updateBookmarkOrderMutation = useUpdateBookmarkOrder();

  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (active.id !== over?.id) {
      const activeIndex = bookmarkList.findIndex(
        record => record.id === +active.id,
      );
      const overIndex = bookmarkList.findIndex(
        record => record.id === +(over?.id || 0),
      );
      const updatedList = arrayMove(bookmarkList, activeIndex, overIndex);
      const orderByBookmarkList = updatedList.map((item, index) => ({
        ...item,
        order: index + 1,
      }));
      setBookmarkList(orderByBookmarkList);
      updateBookmarkOrder(orderByBookmarkList);
    }
  };

  const updateBookmarkOrder = (orderByBookmarkList: Bookmark[]) => {
    updateBookmarkOrderMutation.mutate({
      folderId,
      bookmarkList: orderByBookmarkList,
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
