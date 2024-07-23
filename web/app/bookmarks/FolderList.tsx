import { List, Space } from "antd";
import { useRootFolders } from "@/app/lib/data/query";
import AddFolderBtn from "./AddFolderBtn";
import AddBookMarkBtn from "./AddBookMarkBtn";
import FolderItem from "./FolderItem";

export default function FolderList() {
  const { data: rootFolders, isLoading } = useRootFolders();

  return (
    <>
      <Space>
        <AddFolderBtn />
        <AddBookMarkBtn />
      </Space>
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
