import { List } from 'antd';
import { useChildFolders } from '@/app/lib/data/query';
import ChildFolderItem from './ChildFolderItem';

export default function ChildFolderList({
  parentFolderId,
}: {
  parentFolderId: number;
}) {
  const { data: childFolders, isLoading: isFoldersLoading } =
    useChildFolders(parentFolderId);

  return (
    <>
      {childFolders?.length ? (
        <List
          itemLayout="horizontal"
          dataSource={childFolders}
          loading={isFoldersLoading}
          renderItem={item => <ChildFolderItem folder={item} />}
        />
      ) : null}
    </>
  );
}
