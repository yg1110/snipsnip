import { useQueryClient } from '@tanstack/react-query';
import { Button, Form, Input, message, Modal, Select } from 'antd';
import { useForm } from 'antd/es/form/Form';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

import { useUpdateBookmark } from '@/state/mutations/bookmarkMutation';
import { useAllFolders } from '@/state/queries/folderQuery';
import { Bookmark } from '@/types/bookmarkTypes';

const BookmarkEditor = dynamic(() => import('../bookmark/BookmarkEditor'), {
  ssr: false,
});

type EditBookmarkFormValue = {
  title: string;
  url: string;
  contents: string;
  folderId: number;
};

export default function EditBookmarkBtn({ bookmark }: { bookmark: Bookmark }) {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const { data: allFolders } = useAllFolders();
  const updateBookmarkMutation = useUpdateBookmark();
  const [form] = useForm<EditBookmarkFormValue>();

  useEffect(() => {
    const contetns = bookmark.contents
      .replaceAll('<code>', '')
      .replaceAll('</code>', '')
      .replaceAll('<pre>', '<div>')
      .replaceAll('</pre>', '</div>');
    form.setFieldValue('title', bookmark.title);
    form.setFieldValue('url', bookmark.metadata.url);
    form.setFieldValue('folderId', bookmark.folderId);
    form.setFieldValue('contents', contetns);
  }, [bookmark, form]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const onSubmit = () => {
    if (updateBookmarkMutation.isPending) {
      return;
    }

    const modifiedBookmark = form.getFieldsValue();

    updateBookmarkMutation.mutate(
      {
        ...bookmark,
        ...modifiedBookmark,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['rootFolders'] });
          queryClient.invalidateQueries({ queryKey: ['childFolders'] });
          message.success('북마크가 정보가 수정되었습니다.');
          closeModal();
        },
      },
    );
  };

  const onEditBookmark = () => {
    form.submit();
  };

  return (
    <>
      <Button type="link" onClick={openModal} style={{ color: '#faad14' }}>
        북마크 수정
      </Button>
      <Modal
        className="modal"
        title="북마크 정보 수정"
        open={isModalOpen}
        onOk={onEditBookmark}
        onCancel={closeModal}
        okText="수정"
        cancelText="취소"
        width={'70%'}
        centered
      >
        <Form name="edit-bookmark" form={form} layout="vertical" onFinish={onSubmit}>
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
