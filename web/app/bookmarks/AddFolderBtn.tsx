import { useState } from "react";
import { useAddFolder } from "@/app/lib/data/mutation";
import { Button, Input, Modal, message } from "antd";
import { FolderAddOutlined, FolderTwoTone } from "@ant-design/icons";

const DEFAULT_FOLDER_NAME = "";
const ENTER_KEYCODE = "Enter";

export default function AddFolderBtn() {
  const [addFolderModalOpen, setAddFolderModalOpen] = useState(false);
  const [folderName, setFolderName] = useState(DEFAULT_FOLDER_NAME);
  const addFolderMutation = useAddFolder();

  const openModal = () => {
    setAddFolderModalOpen(true);
  };

  const closeModal = () => {
    setAddFolderModalOpen(false);
    setFolderName("");
  };

  const addFolder = () => {
    if (addFolderMutation.isPending) {
      return;
    }

    addFolderMutation.mutate(
      {
        name: folderName,
        order: 10,
        parentFolderId: null,
      },
      {
        onSuccess: () => {
          message.success("새로운 폴더가 생성되었습니다.");
          closeModal();
        },
      }
    );
  };

  const submit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const key = e.key;

    if (key !== ENTER_KEYCODE) {
      return;
    }

    addFolder();
  };

  return (
    <>
      <Button
        type="dashed"
        size="large"
        icon={<FolderAddOutlined style={{ fontSize: 22 }} />}
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
          onKeyUp={submit}
        />
      </Modal>
    </>
  );
}
