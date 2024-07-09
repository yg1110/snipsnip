import { Button, List } from "antd";
import { FolderOutlined } from "@ant-design/icons";
import { useFolders } from "@/app/lib/data/query";
import AddFolderModal from "./AddFolderModal";
import DeleteFolderBtn from "./DeleteFolderBtn";
import EditFolderBtn from "./EditFolderBtn";

export default function FolderList() {
  const { data: folders, isLoading } = useFolders();

  return (
    <>
      <AddFolderModal />
      <List
        itemLayout="horizontal"
        dataSource={folders ?? []}
        loading={isLoading}
        renderItem={(item) => (
          <List.Item
            actions={[
              <Button key="add-folder">add</Button>,
              <EditFolderBtn key="edit-folder" folder={item} />,
              <DeleteFolderBtn key="delete-folder" folderId={item.id} />,
            ]}
          >
            <List.Item.Meta avatar={<FolderOutlined />} title={item.name} />
          </List.Item>
        )}
      />
    </>
  );
}
