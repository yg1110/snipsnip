import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { Button, Flex, List, Space } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { BsChevronContract } from 'react-icons/bs';
import { BsChevronExpand } from 'react-icons/bs';

import AddBookMarkBtn from '@/components/buttons/AddBookMarkBtn';
import AddFolderBtn from '@/components/buttons/AddFolderBtn';
import { useRootFolders } from '@/state/queries/folderQuery';
import { useStore } from '@/stores/useStore';
import { folderButtonStyle, folderListStyle } from '@/styles/folderPageStyles';

import { useUpdateRootFoldersOrder } from '../../state/mutations/folderMutation';
import { Folder } from '../../types/folderTypes';
import FolderItem, { FolderItemRef } from './FolderItem';

export default function FolderList() {
  const folderItemRef = useRef<(FolderItemRef | null)[]>([]);
  const [rootFolderList, setRootFolderList] = useState<Folder[]>([]);
  const { expanded, collapsed } = useStore();
  const hasRootFolders = rootFolderList.length > 0;

  const { data: rootFolders, isLoading } = useRootFolders();
  const updateRootFoldersOrderMutation = useUpdateRootFoldersOrder();

  const allExpanded = () => {
    folderItemRef.current.forEach(folderItem => {
      if (folderItem) {
        folderItem.setShowChildren(true);
      }
    });
  };

  const allCollapsed = () => {
    folderItemRef.current.forEach(folderItem => {
      if (folderItem) {
        folderItem.setShowChildren(false);
      }
    });
  };

  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (active.id !== over?.id) {
      const activeIndex = rootFolderList.findIndex(
        record => record.id === +active.id,
      );
      const overIndex = rootFolderList.findIndex(
        record => record.id === +(over?.id || 0),
      );
      const activeFolderItem = folderItemRef.current[activeIndex];
      const overFolderItem = folderItemRef.current[overIndex];
      if (activeFolderItem) {
        activeFolderItem.setShowChildren(false);
      }
      if (overFolderItem) {
        overFolderItem.setShowChildren(false);
      }
      const updatedList = arrayMove(rootFolderList, activeIndex, overIndex);
      setRootFolderList(updatedList);
      updateRootFoldersOrder(updatedList);
      allExpanded();
    }
  };

  const onDragStart = (event: DragEndEvent) => {
    allCollapsed();
  };

  const updateRootFoldersOrder = (folderList: Folder[]) => {
    updateRootFoldersOrderMutation.mutate({
      folderList: folderList,
    });
  };

  const allExpandedFolder = () => {
    expanded();
    folderItemRef.current.forEach(folderItemRef => {
      folderItemRef?.setShowChildren(true);
    });
  };

  const allCollapsedFolder = () => {
    collapsed();
    folderItemRef.current.forEach(folderItemRef => {
      folderItemRef?.setShowChildren(false);
    });
  };

  useEffect(() => {
    if (rootFolders) {
      setRootFolderList(rootFolders);
    }
  }, [rootFolders]);

  return (
    <>
      <Flex
        className="button-wrapper"
        style={folderButtonStyle}
        justify="space-between"
      >
        <Space>
          <AddFolderBtn />
          {hasRootFolders && <AddBookMarkBtn />}
        </Space>
        <Space>
          <Button
            type="default"
            icon={<BsChevronExpand />}
            onClick={allExpandedFolder}
          >
            모두 펼치기
          </Button>
          <Button
            type="default"
            icon={<BsChevronContract />}
            onClick={allCollapsedFolder}
          >
            모두 접기
          </Button>
        </Space>
      </Flex>

      <DndContext
        modifiers={[restrictToVerticalAxis]}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
      >
        <SortableContext
          items={rootFolderList.map(i => i.id.toString())}
          strategy={verticalListSortingStrategy}
        >
          <List
            style={folderListStyle}
            itemLayout="horizontal"
            dataSource={rootFolderList}
            loading={isLoading}
            renderItem={(item, index) => (
              <List.Item>
                <FolderItem
                  ref={el => {
                    folderItemRef.current[index] = el;
                  }}
                  folder={item}
                />
              </List.Item>
            )}
          />
        </SortableContext>
      </DndContext>
    </>
  );
}
