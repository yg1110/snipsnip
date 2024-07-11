import { useState } from "react";
import { Button, Popconfirm, message } from "antd";
import { useDeleteFolder } from "@/app/lib/data/mutation";

export default function DeleteFolderBtn({ folderId }: { folderId: number }) {
  const [isOpen, setIsOpen] = useState(false);
  const deleteFolderMutation = useDeleteFolder();

  const openPopconfirm = () => {
    setIsOpen(true);
  };

  const closePopconfirm = () => {
    setIsOpen(false);
  };

  const handleOpenChange = (newOpen: boolean) => {
    setIsOpen(newOpen);
  };

  const deleteFolder = (folderId: number) => {
    deleteFolderMutation.mutate(folderId, {
      onSuccess: () => {
        message.success("폴더가 삭제되었습니다.");
        closePopconfirm();
      },
    });
  };
  return (
    <Popconfirm
      placement="right"
      okType="danger"
      title="정말로 삭제하시겠습니까?"
      description="폴더를 삭제하면 포함된 즐겨찾기가 모두 제거됩니다."
      okText="예"
      cancelText="아니오"
      open={isOpen}
      onCancel={closePopconfirm}
      onOpenChange={handleOpenChange}
      okButtonProps={{
        loading: deleteFolderMutation.isPending,
        onClick: () => deleteFolder(folderId),
      }}
    >
      <Button type="link" danger onClick={openPopconfirm}>
        delete
      </Button>
    </Popconfirm>
  );
}
