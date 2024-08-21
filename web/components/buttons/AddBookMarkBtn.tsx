import { BookFilled } from '@ant-design/icons';
import { useQueryClient } from '@tanstack/react-query';
import { Button, Form, Input, message, Modal, Select } from 'antd';
import dynamic from 'next/dynamic';
import { useState } from 'react';

import { useAddBookmark } from '@/state/mutations/bookmarkMutation';
import { useAllFolders } from '@/state/queries/folderQuery';
import { bookmarkUrlInputStyle } from '@/styles/bookmarkStyles';
import { modalMarginStyle } from '@/styles/commonStyles';

const BookmarkEditor = dynamic(() => import('../bookmark/BookmarkEditor'), {
  ssr: false,
});

type AddBookmarkFormValue = {
  title: string;
  url: string;
  folderId: number;
  content: string;
};

export default function AddBookMarkBtn() {
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);

  const { data: allFolders } = useAllFolders();
  const addBookmarkMutation = useAddBookmark();

  const [form] = Form.useForm<AddBookmarkFormValue>();

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    form.resetFields();
  };

  const onSubmit = () => {
    if (addBookmarkMutation.isPending) {
      return;
    }

    const newBookmark = form.getFieldsValue();
    addBookmarkMutation.mutate(
      {
        ...newBookmark,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['rootFolders'] });
          queryClient.invalidateQueries({ queryKey: ['childFolders'] });
          message.success('새로운 북마크가 추가되었습니다.');
          closeModal();
        },
      },
    );
  };

  const onAddBookmark = () => {
    form.submit();
  };

  return (
    <>
      <Button type="primary" icon={<BookFilled />} onClick={openModal}>
        북마크
      </Button>
      <Modal
        className="modal"
        style={modalMarginStyle}
        title="새 북마크 추가하기"
        open={isOpen}
        onOk={onAddBookmark}
        onCancel={closeModal}
        confirmLoading={addBookmarkMutation.isPending}
        okText="추가"
        cancelText="취소"
        width={'70%'}
        centered
      >
        <Form name="add-bookmark" form={form} layout="vertical" onFinish={onSubmit}>
          <Form.Item
            label="제목"
            name="title"
            rules={[
              {
                required: true,
                message: '제목을 입력해주세요',
              },
            ]}
          >
            <Input placeholder="제목을 입력해주세요" />
          </Form.Item>
          <Form.Item
            style={bookmarkUrlInputStyle}
            label="주소"
            name="url"
            rules={[
              {
                required: true,
                message: '주소를 입력해주세요',
              },
              {
                message: '올바른 주소를 입력해주세요',
                pattern: /^(http|https):\/\/[^ "]+$/,
              },
            ]}
          >
            <Input placeholder="https://www.naver.com" />
          </Form.Item>
          <Form.Item label="저장할 사이트 내용" name="contents">
            <BookmarkEditor />
          </Form.Item>
          <Form.Item label="폴더" name="folderId" rules={[{ required: true, message: '폴더를 선택해주세요' }]}>
            <Select placeholder="폴더를 선택해주세요">
              {allFolders?.map((folder) => (
                <Select.Option key={folder.id} value={folder.id}>
                  {folder.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
