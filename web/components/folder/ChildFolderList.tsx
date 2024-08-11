import { List } from 'antd';
import ChildFolderItem, { ChildFolderItemRef } from './ChildFolderItem';
import { DragEndEvent, DndContext } from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useEffect, useRef, useState } from 'react';
import { Folder } from '@/types/folderTypes';
import { useUpdateSubFoldersOrder } from '../../state/mutations/folderMutation';
import { useStore } from '@/stores/useStore';
import { useChildFolders } from '@/state/queries/folderQuery';

export default function ChildFolderList({
  parentFolderId,
  showChildFolderId,
}: {
  parentFolderId: number;
  showChildFolderId: number;
}) {
  const { isAllExpanded } = useStore();
  const [childFolderList, setChildFolderList] = useState<Folder[]>([]);
  const childFolderItemRef = useRef<(ChildFolderItemRef | null)[]>([]);

  const { data: childFolders, isLoading: isFoldersLoading } =
    useChildFolders(parentFolderId);
  const updateSubFoldersOrderMutation = useUpdateSubFoldersOrder();

  const allExpanded = () => {
    childFolderItemRef.current.forEach(childFolderItem => {
      if (childFolderItem) {
        childFolderItem.setShowChildren(true);
      }
    });
  };

  const allCollapsed = () => {
    childFolderItemRef.current.forEach(childFolderItem => {
      if (childFolderItem) {
        childFolderItem.setShowChildren(false);
      }
    });
  };

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
      allExpanded();
    }
  };

  const onDragStart = (event: DragEndEvent) => {
    allCollapsed();
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

  useEffect(() => {
    if (showChildFolderId) {
      const index = childFolderList.findIndex(
        folder => folder.id === showChildFolderId,
      );
      if (index !== -1) {
        const childFolderItem = childFolderItemRef.current[index];
        if (childFolderItem) {
          childFolderItem.setShowChildren(true);
        }
      }
    }
  }, [showChildFolderId, childFolderList]);

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
