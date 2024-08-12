import { Button, Form, Input, message, Modal, Select } from 'antd';
import { useForm } from 'antd/es/form/Form';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

import { useUpdateBookmark } from '@/state/mutations/bookmarkMutation';
import { useAllFolders } from '@/state/queries/folderQuery';
import { Bookmark } from '@/types/bookmarkTypes';

const BookmarkEditor = dynamic(() => import('../bookmark/BookmarkEditor'), { ssr: false });

type EditBookmarkFormValue = {
  title: string;
  url: string;
  contents: string;
  folderId: number;
};

export default function EditBookmarkBtn({ bookmark }: { bookmark: Bookmark }) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [contents, setContents] = useState<string>('');

  const { data: allFolders } = useAllFolders();
  const updateBookmarkMutation = useUpdateBookmark();
  const [form] = useForm<EditBookmarkFormValue>();

  useEffect(() => {
    form.setFieldValue('title', bookmark.title);
    form.setFieldValue('url', bookmark.metadata.url);
    form.setFieldValue('folderId', bookmark.folderId);
    form.setFieldValue('contents', bookmark.contents);
    setContents(bookmark.contents);
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
          message.success('북마크가 정보가 수정되었습니다.');
          closeModal();
          form.resetFields();
        },
      },
    );
  };

  return (
    <>
      <Button type="link" onClick={openModal} style={{ color: '#faad14' }}>
        북마크 수정
      </Button>
      <Modal
        title="북마크 정보 수정"
        open={isModalOpen}
        onOk={onSubmit}
        onCancel={closeModal}
        okText="수정"
        cancelText="취소"
        width={400}
      >
        <Form name="edit-bookmark" form={form} layout="vertical">
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
            <BookmarkEditor initialData={contents} />
          </Form.Item>
          <Form.Item label="폴더" name="folderId" rules={[{ required: true }]}>
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
