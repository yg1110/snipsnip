import { Button, Flex, List, Space } from 'antd';
import { useRootFolders } from '@/app/lib/data/query';
import AddFolderBtn from './AddFolderBtn';
import AddBookMarkBtn from './AddBookMarkBtn';
import FolderItem, { FolderItemRef } from './FolderItem';
import { folderButtonStyle, folderListStyle } from '../ui/folderPageStyles';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useState, useEffect, useRef } from 'react';
import { useUpdateRootFoldersOrder } from '../lib/data/mutation';
import { Folder } from '../lib/types/dataTypes';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { BsChevronContract } from 'react-icons/bs';
import { BsChevronExpand } from 'react-icons/bs';
import { useStore } from '../store/useStore';

export default function FolderList() {
  const folderItemRef = useRef<(FolderItemRef | null)[]>([]);
  const [rootFolderList, setRootFolderList] = useState<Folder[]>([]);
  const { expanded, collapsed } = useStore();

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
          <AddBookMarkBtn />
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
