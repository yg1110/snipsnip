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
import {
  MutableRefObject,
  RefObject,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Folder } from '../lib/types/dataTypes';
import { useUpdateSubFoldersOrder } from '../lib/data/mutation';
import { useStore } from '../store/useStore';

export default function ChildFolderList({
  parentFolderId,
}: {
  parentFolderId: number;
}) {
  const { expanded, collapsed, isAllExpanded } = useStore();
  const childFolderItemRef = useRef<(ChildFolderItemRef | null)[]>([]);
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
      const activeChildFolderItem = childFolderItemRef.current[activeIndex];
      const overChildFolderItem = childFolderItemRef.current[overIndex];
      if (activeChildFolderItem) {
        activeChildFolderItem.setShowChildren(false);
      }
      if (overChildFolderItem) {
        overChildFolderItem.setShowChildren(false);
      }
      const updatedList = arrayMove(childFolderList, activeIndex, overIndex);
      setChildFolderList(updatedList);
      updateSubFoldersOrder(updatedList);
    }
  };

  const onDragStart = (event: DragEndEvent) => {
    const index = event.active.data.current?.sortable.index;
    if (index === undefined) return;
    const childFolderItem = childFolderItemRef.current[index];
    if (childFolderItem) {
      childFolderItem.setShowChildren(false);
    }
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

  useEffect(() => {
    if (isAllExpanded) {
      childFolderItemRef.current.forEach(childFolderItem => {
        childFolderItem?.setShowChildren(true);
      });
    } else {
      childFolderItemRef.current.forEach(childFolderItem => {
        childFolderItem?.setShowChildren(false);
      });
    }
  }, [isAllExpanded]);

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
              renderItem={(item, index) => (
                <ChildFolderItem
                  ref={el => {
                    childFolderItemRef.current[index] = el;
                  }}
                  folder={item}
                />
              )}
            />
          </SortableContext>
        </DndContext>
      ) : null}
    </>
  );
}
