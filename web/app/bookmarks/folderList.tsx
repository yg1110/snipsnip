import { Button, Input, List, Modal } from "antd";
import {
  FolderAddOutlined,
  FolderOutlined,
  FolderTwoTone,
} from "@ant-design/icons";
import { useFolders } from "@/app/lib/data/query";
import { useAddFolder } from "@/app/lib/data/mutation";
import { useState } from "react";

export default function FolderList() {
  const [addFolderModalOpen, setAddFolderModalOpen] = useState(false);
  const [folderName, setFolderName] = useState("");

  const { data: folders } = useFolders();
  const addFolderMutation = useAddFolder();

  const openModal = () => {
    setAddFolderModalOpen(true);
  };

  const closeModal = () => {
    setAddFolderModalOpen(false);
    setFolderName("");
  };

  const addFolder = () => {
    addFolderMutation.mutate(
      {
        name: folderName,
        order: 10,
        parentFolderId: null,
      },
      {
        onSuccess: () => {
          closeModal();
        },
      }
    );
  };

  return (
    <>
      <Button
        type="dashed"
        size="large"
        icon={<FolderAddOutlined />}
        onClick={openModal}
      />
      <Modal
        title="새 폴더 추가하기"
        open={addFolderModalOpen}
        onOk={addFolder}
        onCancel={closeModal}
        confirmLoading={addFolderMutation.isPending}
      >
        <Input
          value={folderName}
          onChange={(e) => setFolderName(e.target.value)}
          placeholder="type your folder name"
          prefix={<FolderTwoTone />}
        />
      </Modal>
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
            <List.Item.Meta
              avatar={<FolderOutlined />}
              title={item.name}
              // description="펼치기"
            />
          </List.Item>
        )}
      />
    </>
  );
}
