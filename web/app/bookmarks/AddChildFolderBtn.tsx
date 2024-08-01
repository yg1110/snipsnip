import { useState } from 'react';
import { useAddFolder } from '@/app/lib/data/mutation';
import { Button, Input, Modal, message } from 'antd';
import { FolderTwoTone } from '@ant-design/icons';
import { DEFAULT_FOLDER_NAME, ENTER_KEYCODE } from '../shared/constants';

export default function AddChildFolderBtn({
  parentFolderId,
}: {
  parentFolderId: number;
}) {
  const [addFolderModalOpen, setAddFolderModalOpen] = useState(false);
  const [folderName, setFolderName] = useState(DEFAULT_FOLDER_NAME);
  const addFolderMutation = useAddFolder();

  const openModal = () => {
    setAddFolderModalOpen(true);
  };

  const closeModal = () => {
    setAddFolderModalOpen(false);
    setFolderName('');
  };

  const addFolder = () => {
    if (addFolderMutation.isPending) {
      return;
    }

    addFolderMutation.mutate(
      {
        name: folderName,
        order: 10,
        parentFolderId,
      },
      {
        onSuccess: () => {
          message.success('새로운 폴더가 생성되었습니다.');
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

    addFolder();
  };

  return (
    <>
      <Button type="link" onClick={openModal}>
        폴더 추가
      </Button>
      <Modal
        title="새 폴더 추가하기"
        open={addFolderModalOpen}
        onOk={addFolder}
        onCancel={closeModal}
        confirmLoading={addFolderMutation.isPending}
        okText="추가"
        cancelText="취소"
        width={400}
      >
        <Input
          value={folderName}
          onChange={e => setFolderName(e.target.value)}
          placeholder="폴더명을 입력해주세요"
          prefix={<FolderTwoTone />}
          onKeyUp={submit}
        />
      </Modal>
    </>
  );
}
