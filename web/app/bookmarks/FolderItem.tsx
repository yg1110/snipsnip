import { useState } from "react";
import { Button, Dropdown, Flex, List, MenuProps, Space } from "antd";
import {
  BookFilled,
  FolderOutlined,
  MoreOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Folder } from "@/app/lib/types/dataTypes";
import { folderItemStyle } from "@/app/ui/folderPageStyles";
import { useBookmarks, useChildFolders } from "@/app/lib/data/query";
import EditFolderBtn from "./EditFolderBtn";
import DeleteFolderBtn from "./DeleteFolderBtn";

export default function FolderItem({ folder }: { folder: Folder }) {
  const [showChildren, setShowChildren] = useState(false);

  const { data: childFolders, isLoading: isFoldersLoading } = useChildFolders(
    folder.id
  );

  const { data: bookmarks, isLoading: isBookmarksLoading } = useBookmarks(
    folder.id
  );

  const folderMenuButtonGroup: MenuProps["items"] = [
    {
      label: <EditFolderBtn folder={folder} />,
      key: "0",
    },
    {
      label: <DeleteFolderBtn folderId={folder.id} />,
      key: "1",
    },
  ];

  return (
    <List.Item.Meta
      avatar={<FolderOutlined />}
      title={
        <Flex justify="space-between">
          <Space
            onClick={() => setShowChildren((prev) => !prev)}
            style={folderItemStyle}
          >
            {folder.name}
          </Space>
          <Space direction="horizontal">
            <Button type="text" icon={<PlusOutlined />} size="small" />
            <Dropdown
              menu={{ items: folderMenuButtonGroup }}
              trigger={["click"]}
            >
              <Button type="text" icon={<MoreOutlined />} size="small" />
            </Dropdown>
          </Space>
        </Flex>
      }
      description={
        showChildren && (
          <>
            {childFolders?.length ? (
              <List
                itemLayout="horizontal"
                dataSource={childFolders}
                loading={isFoldersLoading}
                renderItem={(item) => (
                  <List.Item actions={[<Button key="add-folder">add</Button>]}>
                    <List.Item.Meta
                      avatar={<FolderOutlined />}
                      title={item.name}
                    />
                  </List.Item>
                )}
              />
            ) : null}
            {bookmarks?.length ? (
              <List
                itemLayout="horizontal"
                dataSource={bookmarks}
                loading={isBookmarksLoading}
                renderItem={(item) => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={<BookFilled />}
                      title={item.title}
                    />
                  </List.Item>
                )}
              />
            ) : null}
          </>
        )
      }
    />
  );
}
