import { List } from 'antd';
import { useChildFolders } from '@/app/lib/data/query';
import ChildFolderItem, { ChildFolderItemRef } from './ChildFolderItem';
import { DragEndEvent, DndContext } from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useEffect, useRef, useState } from 'react';
import { Folder } from '../lib/types/dataTypes';
import { useUpdateSubFoldersOrder } from '../lib/data/mutation';

export default function ChildFolderList({
  parentFolderId,
}: {
  parentFolderId: number;
}) {
  const childFolderItemRef = useRef<ChildFolderItemRef>(null);
  const [childFolderList, setChildFolderList] = useState<Folder[]>([]);

  const { data: childFolders, isLoading: isFoldersLoading } =
    useChildFolders(parentFolderId);
  const updateSubFoldersOrderMutation = useUpdateSubFoldersOrder();

  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (active.id !== over?.id) {
      const activeIndex = childFolderList.findIndex(
        record => record.id === +active.id,
      );
      const overIndex = childFolderList.findIndex(
        record => record.id === +(over?.id || 0),
      );
      const updatedList = arrayMove(childFolderList, activeIndex, overIndex);
      setChildFolderList(updatedList);
      updateSubFoldersOrder(updatedList);
    }
  };

  const onDragStart = () => {
    childFolderItemRef.current?.setShowChildren(false);
  };

  const updateSubFoldersOrder = (folderList: Folder[]) => {
    updateSubFoldersOrderMutation.mutate({
      parentFolderId,
      folderList: folderList,
    });
  };

  useEffect(() => {
    if (childFolders) {
      setChildFolderList(childFolders);
    }
  }, [childFolders]);

  return (
    <>
      {childFolders?.length ? (
        <DndContext
          modifiers={[restrictToVerticalAxis]}
          onDragEnd={onDragEnd}
          onDragStart={onDragStart}
        >
          <SortableContext
            items={childFolderList.map(i => i.id.toString())}
            strategy={verticalListSortingStrategy}
          >
            <List
              itemLayout="horizontal"
              dataSource={childFolderList}
              loading={isFoldersLoading}
              renderItem={item => (
                <ChildFolderItem ref={childFolderItemRef} folder={item} />
              )}
            />
          </SortableContext>
        </DndContext>
      ) : null}
    </>
  );
}
