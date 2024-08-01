import { useState } from 'react';
import { Button, Dropdown, Flex, List, MenuProps, Space } from 'antd';
import {
  CaretDownOutlined,
  CaretRightOutlined,
  FolderOutlined,
  MoreOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { Folder } from '@/app/lib/types/dataTypes';
import { folderCountStyle, folderItemStyle } from '@/app/ui/folderPageStyles';
import EditFolderBtn from './EditFolderBtn';
import DeleteFolderBtn from './DeleteFolderBtn';
import BookmarkList from './BookmarkList';
import ChildFolderList from './ChildFolderList';
import AddChildBookmarkCBtn from './AddChildBookmarkBtn';
import AddChildFolderBtn from './AddChildFolderBtn';

export default function FolderItem({ folder }: { folder: Folder }) {
  const [showChildren, setShowChildren] = useState(false);

  const folderMenuButtonGroup: MenuProps['items'] = [
    {
      label: <EditFolderBtn folder={folder} />,
      key: '0',
    },
    {
      label: <DeleteFolderBtn folderId={folder.id} />,
      key: '1',
    },
  ];

  const folderAddableGruop: MenuProps['items'] = [
    {
      label: <AddChildFolderBtn parentFolderId={folder.id} />,
      key: '0',
    },
    {
      label: <AddChildBookmarkCBtn parentFolderId={folder.id} />,
      key: '1',
    },
  ];

  return (
    <List.Item.Meta
      avatar={
        showChildren ? (
          <Flex gap="4px">
            {folder.subFolderCount + folder.bookmarkCount > 0 && (
              <CaretDownOutlined
                onClick={() => setShowChildren(prev => !prev)}
              />
            )}
            <FolderOutlined />
          </Flex>
        ) : (
          <Flex gap="4px">
            {folder.subFolderCount + folder.bookmarkCount > 0 && (
              <CaretRightOutlined
                onClick={() => setShowChildren(prev => !prev)}
              />
            )}
            <FolderOutlined />
          </Flex>
        )
      }
      title={
        <Flex justify="space-between">
          <Space
            onClick={() => setShowChildren(prev => !prev)}
            style={folderItemStyle}
          >
            {folder.name}
            {folder.bookmarkCount > 0 && (
              <span style={folderCountStyle}>({folder.bookmarkCount})</span>
            )}
          </Space>
          <Space direction="horizontal">
            <Dropdown menu={{ items: folderAddableGruop }} trigger={['click']}>
              <Button type="text" icon={<PlusOutlined />} size="small" />
            </Dropdown>
            <Dropdown
              menu={{ items: folderMenuButtonGroup }}
              trigger={['click']}
            >
              <Button type="text" icon={<MoreOutlined />} size="small" />
            </Dropdown>
          </Space>
        </Flex>
      }
      description={
        showChildren && (
          <>
            <ChildFolderList parentFolderId={folder.id} />
            <BookmarkList folderId={folder.id} />
          </>
        )
      }
    />
  );
}
