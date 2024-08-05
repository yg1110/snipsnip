import { useState } from 'react';
import { Button, Modal, Space, message } from 'antd';
import { useDeleteFolder } from '@/app/lib/data/mutation';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { useQueryClient } from '@tanstack/react-query';

export default function DeleteFolderBtn({ folderId }: { folderId: number }) {
  const [isOpen, setIsOpen] = useState(false);
  const deleteFolderMutation = useDeleteFolder();
  const queryClient = useQueryClient();

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const deleteFolder = () => {
    deleteFolderMutation.mutate(folderId, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['rootFolders'] });
        queryClient.invalidateQueries({ queryKey: ['childFolders'] });
        message.success('폴더가 삭제되었습니다.');
        closeModal();
      },
    });
  };

  return (
    <>
      <Button type="link" danger onClick={openModal}>
        폴더 삭제
      </Button>
      <Modal
        title={
          <Space>
            <ExclamationCircleFilled style={{ color: '#faad14' }} />
            <p>폴더 삭제하기</p>
          </Space>
        }
        open={isOpen}
        onOk={deleteFolder}
        onCancel={closeModal}
        confirmLoading={deleteFolderMutation.isPending}
      >
        <p>폴더를 삭제하면 포함된 즐겨찾기가 모두 제거됩니다.</p>
        <p>정말로 삭제하시겠습니까?</p>
      </Modal>
    </>
  );
}
