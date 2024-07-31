import { useState } from 'react';
import { Folder } from '@/app/lib/types/dataTypes';
import { useUpdateFolder } from '../lib/data/mutation';
import { Button, Input, Modal, message } from 'antd';
import { FolderTwoTone } from '@ant-design/icons';
import { ENTER_KEYCODE } from '@/app/shared/constants';

export default function EditFolderBtn({ folder }: { folder: Folder }) {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [folderName, setFolderName] = useState(folder.name);

  const editFolderMutation = useUpdateFolder();

  const openModal = () => {
    setEditModalOpen(true);
  };

  const closeModal = () => {
    setEditModalOpen(false);
  };

  const editFolder = () => {
    if (editFolderMutation.isPending) {
      return;
    }

    editFolderMutation.mutate(
      {
        id: folder.id,
        name: folderName,
        order: 999,
        parentFolderId: null,
      },
      {
        onSuccess: () => {
          message.success('폴더명이 수정되었습니다.');
          closeModal();
        },
      },
    );
  };

  const submit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const key = e.key;

    if (key !== ENTER_KEYCODE) {
      return;
    }

    editFolder();
  };

  return (
    <>
      <Button type="link" onClick={openModal} style={{ color: "#f59f00" }}>
        폴더 수정
      </Button>
      <Modal
        title="폴더명 변경하기"
        open={editModalOpen}
        onOk={editFolder}
        onCancel={closeModal}
        confirmLoading={editFolderMutation.isPending}
      >
        <Input
          value={folderName}
          onChange={e => setFolderName(e.target.value)}
          placeholder="type your folder name"
          prefix={<FolderTwoTone />}
          onKeyUp={submit}
        />
      </Modal>
    </>
  );
}
