import { useState } from "react";
import { Button, Form, Input, Modal, Select, message } from "antd";
import { BookOutlined } from "@ant-design/icons";
import { useRootFolders } from "@/app/lib/data/query";
import { useAddBookmark } from "@/app/lib/data/mutation";

type AddBookmarkFormValue = {
  title: string;
  url: string;
  folderId: number;
};

const { Option } = Select;

export default function AddBookMarkBtn() {
  const [isOpen, setIsOpen] = useState(false);

  const { data: rootFolders } = useRootFolders();
  const addBookmarkMutation = useAddBookmark();

  const [form] = Form.useForm<AddBookmarkFormValue>();

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const onSubmit = () => {
    if (addBookmarkMutation.isPending) {
      return;
    }

    const newBookmark = form.getFieldsValue();

    addBookmarkMutation.mutate(
      {
        folderId: newBookmark.folderId,
        title: newBookmark.title,
        url: newBookmark.url,
        order: 1,
      },
      {
        onSuccess: () => {
          message.success("새로운 즐겨찾기가 추가되었습니다.");
          closeModal();
          form.resetFields();
        },
      }
    );
  };

  return (
    <>
      <Button
        type="dashed"
        size="large"
        icon={<BookOutlined style={{ fontSize: 22 }} />}
        onClick={openModal}
      />
      <Modal
        title="새 북마크 추가하기"
        open={isOpen}
        onOk={onSubmit}
        onCancel={closeModal}
        confirmLoading={addBookmarkMutation.isPending}
      >
        <Form name="add-bookmark" form={form}>
          <Form.Item label="title" name="title">
            <Input />
          </Form.Item>
          <Form.Item label="url" name="url" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            label="folderId"
            name="folderId"
            rules={[{ required: true }]}
          >
            <Select placeholder="Select a folder">
              {rootFolders?.map((folder) => (
                <Option key={folder.id} value={folder.id}>
                  {folder.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
