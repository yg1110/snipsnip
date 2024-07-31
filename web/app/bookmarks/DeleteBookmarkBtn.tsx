import { ExclamationCircleFilled } from '@ant-design/icons';
import { Button, Modal, Space, message } from 'antd';
import { useState } from 'react';
import { useDeleteBookmark } from '@/app/lib/data/mutation';

export default function DeleteBookmarkBtn({
  bookmarkId,
}: {
  bookmarkId: number;
}) {
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
        message.success('즐겨찾기가 삭제되었습니다.');
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
        title={
          <Space>
            <ExclamationCircleFilled style={{ color: '#faad14' }} />
            <p>즐겨찾기 삭제</p>
          </Space>
        }
        open={isModalOpen}
        onOk={deleteBookmark}
        onCancel={closeModal}
        confirmLoading={deleteBookmarkMutation.isPending}
      >
        <p>정말로 즐겨찾기를 삭제하시겠습니까?</p>
      </Modal>
    </>
  );
}
