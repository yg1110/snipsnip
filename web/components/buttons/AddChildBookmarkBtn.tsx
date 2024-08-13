import { useQueryClient } from '@tanstack/react-query';
import { Button, Form, Input, message, Modal, Select } from 'antd';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

import { useAddBookmark } from '@/state/mutations/bookmarkMutation';
import { useChildFolders, useFolder } from '@/state/queries/folderQuery';

const BookmarkEditor = dynamic(() => import('../bookmark/BookmarkEditor'), {
  ssr: false,
});

type AddChildBookmarkFormValue = {
  title: string;
  url: string;
  folderId: number;
};

export default function AddChildBookmarkCBtn({
  parentFolderId,
  setShowChildren,
  setShowChildFolderId,
}: {
  parentFolderId: number;
  setShowChildren: (value: boolean) => void;
  setShowChildFolderId?: (value: number) => void;
}) {
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);

  const { data: currentFolder } = useFolder(parentFolderId);
  const { data: childFolders } = useChildFolders(parentFolderId);
  const addBookmarkMutation = useAddBookmark();

  const [form] = Form.useForm<AddChildBookmarkFormValue>();

  useEffect(() => {
    form.setFieldValue('folderId', currentFolder?.id);
  }, [form, currentFolder]);

  const folders = currentFolder && [currentFolder, ...(childFolders ?? [])];

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
          setShowChildren(true);
          if (newBookmark.folderId !== currentFolder?.id) {
            setShowChildFolderId?.(newBookmark.folderId);
          }
        },
      },
    );
  };

  return (
    <>
      <Button type="link" onClick={openModal}>
        북마크 추가
      </Button>
      <Modal
        title="새 북마크 추가하기"
        open={isOpen}
        onOk={onSubmit}
        onCancel={closeModal}
        confirmLoading={addBookmarkMutation.isPending}
        okText="추가"
        cancelText="취소"
        width={'70%'}
        centered
      >
        <Form name="add-child-bookmark" form={form} layout="vertical">
          <Form.Item label="제목" name="title">
            <Input placeholder="제목을 입력해주세요" />
          </Form.Item>
          <Form.Item
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
          <Form.Item
            label="저장할 사이트 내용"
            name="contents"
            rules={[
              {
                required: true,
                message: '저장할 사이트 내용을 입력해주세요',
              },
            ]}
          >
            <BookmarkEditor />
          </Form.Item>
          <Form.Item label="폴더" name="folderId" rules={[{ required: true }]}>
            <Select placeholder="폴더를 선택해주세요">
              {folders?.map(folder => (
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
