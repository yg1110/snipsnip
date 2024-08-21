import { ExclamationCircleFilled } from '@ant-design/icons';
import { useQueryClient } from '@tanstack/react-query';
import { Button, message, Modal, Space } from 'antd';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { useDeleteBookmark } from '@/state/mutations/bookmarkMutation';

export default function DeleteBookmarkBtn({ bookmarkId }: { bookmarkId: number }) {
  const queryClient = useQueryClient();
  const router = useRouter();
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
        const pathName = window.location.pathname;
        queryClient.invalidateQueries({ queryKey: ['rootFolders'] });
        queryClient.invalidateQueries({ queryKey: ['childFolders'] });
        message.success('북마크가 삭제되었습니다.');
        closeModal();

        if (pathName !== '/bookmark') {
          router.replace('/bookmark');
        }
      },
    });
  };

  return (
    <>
      <Button type="link" danger onClick={openModal}>
        북마크 삭제
      </Button>
      <Modal
        className="modal"
        okText="삭제"
        cancelText="취소"
        width={'70%'}
        centered
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
