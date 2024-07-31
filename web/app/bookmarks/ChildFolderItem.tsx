import { useState } from 'react';
import { FolderOutlined, MoreOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Dropdown, Flex, List, MenuProps, Space } from 'antd';
import { Folder } from '@/app/lib/types/dataTypes';
import BookmarkList from './BookmarkList';
import EditFolderBtn from './EditFolderBtn';
import DeleteFolderBtn from './DeleteFolderBtn';
import AddChildBookmarkCBtn from './AddChildBookmarkBtn';

export default function ChildFolderItem({ folder }: { folder: Folder }) {
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

  const folderUnAddableGruop: MenuProps['items'] = [
    {
      label: <AddChildBookmarkCBtn parentFolderId={folder.id} />,
      key: '0',
    },
  ];

  return (
    <List.Item>
      <List.Item.Meta
        avatar={<FolderOutlined />}
        title={
          <Flex justify="space-between">
            <Space onClick={() => setShowChildren(prev => !prev)}>
              {folder.name}
            </Space>
            <Space direction="horizontal">
              <Dropdown
                menu={{ items: folderUnAddableGruop }}
                trigger={['click']}
              >
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
        description={showChildren && <BookmarkList folderId={folder.id} />}
      />
    </List.Item>
  );
}
