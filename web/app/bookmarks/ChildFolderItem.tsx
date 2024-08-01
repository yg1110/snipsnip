import { useState } from 'react';
import { FolderOutlined, MoreOutlined } from '@ant-design/icons';
import { Button, Dropdown, Flex, List, MenuProps, Space } from 'antd';
import { Folder } from '@/app/lib/types/dataTypes';
import BookmarkList from './BookmarkList';
import EditFolderBtn from './EditFolderBtn';
import DeleteFolderBtn from './DeleteFolderBtn';
import AddChildBtnGroup from './AddChildBtnGroup';

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
              <AddChildBtnGroup parentFolderId={folder.id} />
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
