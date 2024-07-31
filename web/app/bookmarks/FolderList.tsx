import { Button, List, Space } from "antd";
import { useRootFolders } from "@/app/lib/data/query";
import AddFolderBtn from "./AddFolderBtn";
import AddBookMarkBtn from "./AddBookMarkBtn";
import FolderItem from "./FolderItem";
import { folderButtonStyle, folderListStyle } from "../ui/folderPageStyles";

export default function FolderList() {
  const { data: rootFolders, isLoading } = useRootFolders();

  return (
    <>
      <Space style={folderButtonStyle}>
        <AddFolderBtn />
        <AddBookMarkBtn />
      </Space>
      <List
        style={folderListStyle}
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
