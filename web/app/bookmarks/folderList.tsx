import { Button, List } from "antd";
import { FolderOutlined } from "@ant-design/icons";
import { useFolders } from "@/app/lib/data/query";
import AddFolderModal from "./AddFolderModal";

export default function FolderList() {
  const { data: folders } = useFolders();

  return (
    <>
      <AddFolderModal />
      <List
        itemLayout="horizontal"
        dataSource={folders ?? []}
        renderItem={(item) => (
          <List.Item
            actions={[
              <Button key="add-folder">add</Button>,
              <Button key="edit-folder" type="link">
                edit
              </Button>,
              <Button key="delete-folder" type="link" danger>
                delete
              </Button>,
            ]}
          >
            <List.Item.Meta avatar={<FolderOutlined />} title={item.name} />
          </List.Item>
        )}
      />
    </>
  );
}
