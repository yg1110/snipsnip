import { List, Space } from 'antd';
import { useRootFolders } from '@/app/lib/data/query';
import AddFolderBtn from './AddFolderBtn';
import AddBookMarkBtn from './AddBookMarkBtn';
import FolderItem from './FolderItem';
import { folderButtonStyle, folderListStyle } from '../ui/folderPageStyles';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useState, useEffect } from 'react';
import { useUpdateRootFoldersOrder } from '../lib/data/mutation';
import { Folder } from '../lib/types/dataTypes';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';

export default function FolderList() {
  const [rootFolderList, setRootFolderList] = useState<Folder[]>([]);

  const { data: rootFolders, isLoading } = useRootFolders();
  const updateRootFoldersOrderMutation = useUpdateRootFoldersOrder();

  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (active.id !== over?.id) {
      const activeIndex = rootFolderList.findIndex(
        record => record.id === +active.id,
      );
      const overIndex = rootFolderList.findIndex(
        record => record.id === +(over?.id || 0),
      );
      const updatedList = arrayMove(rootFolderList, activeIndex, overIndex);
      setRootFolderList(updatedList);
      updateRootFoldersOrder(updatedList);
    }
  };

  const updateRootFoldersOrder = (folderList: Folder[]) => {
    updateRootFoldersOrderMutation.mutate({
      folderList: folderList,
    });
  };

  useEffect(() => {
    if (rootFolders) {
      setRootFolderList(rootFolders);
    }
  }, [rootFolders]);

  return (
    <>
      <Space style={folderButtonStyle}>
        <AddFolderBtn />
        <AddBookMarkBtn />
      </Space>

      <DndContext modifiers={[restrictToVerticalAxis]} onDragEnd={onDragEnd}>
        <SortableContext
          items={rootFolderList.map(i => i.id.toString())}
          strategy={verticalListSortingStrategy}
        >
          <List
            style={folderListStyle}
            itemLayout="horizontal"
            dataSource={rootFolderList}
            loading={isLoading}
            renderItem={item => (
              <List.Item>
                <FolderItem folder={item} />
              </List.Item>
            )}
          />
        </SortableContext>
      </DndContext>
    </>
  );
}
