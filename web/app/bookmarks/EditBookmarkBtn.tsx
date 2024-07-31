import { useEffect, useState } from 'react';
import { Button, Form, Input, Modal, Select, message } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { useRootFolders } from '@/app/lib/data/query';
import { Bookmark } from '@/app/lib/types/dataTypes';
import { useUpdateBookmark } from '@/app/lib/data/mutation';

type EditBookmarkFormValue = {
  title: string;
  url: string;
  folderId: number;
};

export default function EditBookmarkBtn({ bookmark }: { bookmark: Bookmark }) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const { data: rootFolders } = useRootFolders();
  const updateBookmarkMutation = useUpdateBookmark();
  const [form] = useForm<EditBookmarkFormValue>();

  useEffect(() => {
    form.setFieldValue('title', bookmark.title);
    form.setFieldValue('url', bookmark.metadata.url);
    form.setFieldValue('folderId', bookmark.folderId);
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
          message.success('즐겨찾기가 정보가 수정되었습니다.');
          closeModal();
          form.resetFields();
        },
      },
    );
  };

  return (
    <>
      <Button type="link" onClick={openModal} style={{ color: "#faad14" }}>
        북마크 수정
      </Button>
      <Modal
        title="북마크 정보 수정"
        open={isModalOpen}
        onOk={onSubmit}
        onCancel={closeModal}
      >
        <Form name="edit-bookmark" form={form}>
          <Form.Item label="제목" name="title">
            <Input />
          </Form.Item>
          <Form.Item label="주소" name="url" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="폴더" name="folderId" rules={[{ required: true }]}>
            <Select placeholder="Select a folder">
              {rootFolders?.map(folder => (
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
