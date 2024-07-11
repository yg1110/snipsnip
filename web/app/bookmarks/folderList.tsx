import { Button, List } from "antd";
import { FolderOutlined } from "@ant-design/icons";
import { useRootFolders } from "@/app/lib/data/query";
import AddFolderModal from "./AddFolderModal";
import DeleteFolderBtn from "./DeleteFolderBtn";
import EditFolderBtn from "./EditFolderBtn";
import FolderItem from "./FolderItem";

export default function FolderList() {
  const { data: rootFolders, isLoading } = useRootFolders();

  return (
    <>
      <AddFolderModal />
      <List
        itemLayout="horizontal"
        dataSource={rootFolders ?? []}
        loading={isLoading}
        renderItem={(item) => (
          <List.Item
            actions={[
              <Button key="add-folder">add</Button>,
              <EditFolderBtn key="edit-folder" folder={item} />,
              <DeleteFolderBtn key="delete-folder" folderId={item.id} />,
            ]}
          >
            <FolderItem folder={item} />
          </List.Item>
        )}
      />
    </>
  );
}
