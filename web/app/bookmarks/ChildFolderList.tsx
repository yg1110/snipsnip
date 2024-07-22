import { FolderOutlined } from "@ant-design/icons";
import { Button, List } from "antd";
import { useChildFolders } from "@/app/lib/data/query";

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
          renderItem={(item) => (
            <List.Item actions={[<Button key="add-folder">add</Button>]}>
              <List.Item.Meta avatar={<FolderOutlined />} title={item.name} />
            </List.Item>
          )}
        />
      ) : null}
    </>
  );
}
