import { List } from "antd";
import { useRootFolders } from "@/app/lib/data/query";
import AddFolderModal from "./AddFolderModal";
import FolderItem from "./FolderItem";

export default function FolderList() {
  const { data: rootFolders, isLoading } = useRootFolders();

  return (
    <>
      <AddFolderModal />
      <List
        itemLayout="horizontal"
        dataSource={rootFolders ?? []}
        loading={isLoading}
        renderItem={(item) => (
          <List.Item>
            <FolderItem folder={item} />
          </List.Item>
        )}
      />
    </>
  );
}
