import { useEffect, useState } from 'react';
import { Button, Form, Input, Modal, Select, message } from 'antd';
import { useChildFolders, useFolder } from '@/app/lib/data/query';
import { useAddBookmark } from '@/app/lib/data/mutation';
import { useQueryClient } from '@tanstack/react-query';

type AddChildBookmarkFormValue = {
  title: string;
  url: string;
  folderId: number;
};

export default function AddChildBookmarkCBtn({
  parentFolderId,
}: {
  parentFolderId: number;
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
        order: 1,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['rootFolders'] });
          queryClient.invalidateQueries({ queryKey: ['childFolders'] });
          message.success('새로운 즐겨찾기가 추가되었습니다.');
          closeModal();
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
        width={400}
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
