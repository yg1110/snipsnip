import { PlusOutlined } from '@ant-design/icons';
import { Button, Space, Tooltip } from 'antd';
import AddChildBookmarkCBtn from './AddChildBookmarkBtn';
import AddChildFolderBtn from './AddChildFolderBtn';

export default function AddChildBtnGroup({
  parentFolderId,
  folderAddable,
}: {
  parentFolderId: number;
  folderAddable?: boolean;
}) {
  return (
    <Tooltip
      title={
        <Space size={4}>
          {folderAddable && (
            <AddChildFolderBtn parentFolderId={parentFolderId} />
          )}
          <AddChildBookmarkCBtn parentFolderId={parentFolderId} />
        </Space>
      }
      color="#FFFFFF"
      trigger={['click']}
    >
      <Button type="text" icon={<PlusOutlined />} size="small" />
    </Tooltip>
  );
}
