import { ExclamationCircleFilled } from '@ant-design/icons';
import { Button, Modal, Space, message } from 'antd';
import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useDeleteBookmark } from '@/state/mutations/bookmarkMutation';

export default function DeleteBookmarkBtn({
  bookmarkId,
}: {
  bookmarkId: number;
}) {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const deleteBookmarkMutation = useDeleteBookmark();

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const deleteBookmark = () => {
    deleteBookmarkMutation.mutate(bookmarkId, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['rootFolders'] });
        queryClient.invalidateQueries({ queryKey: ['childFolders'] });
        message.success('북마크가 삭제되었습니다.');
        closeModal();
      },
    });
  };

  return (
    <>
      <Button type="link" danger onClick={openModal}>
        북마크 삭제
      </Button>
      <Modal
        okText="삭제"
        cancelText="취소"
        width={400}
        title={
          <Space>
            <ExclamationCircleFilled style={{ color: '#f03e3e' }} />
            <p>북마크 삭제</p>
          </Space>
        }
        open={isModalOpen}
        onOk={deleteBookmark}
        onCancel={closeModal}
        confirmLoading={deleteBookmarkMutation.isPending}
      >
        <p>정말로 북마크를 삭제하시겠습니까?</p>
      </Modal>
    </>
  );
}
