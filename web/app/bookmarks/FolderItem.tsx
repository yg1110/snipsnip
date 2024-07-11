import { useState } from "react";
import { Button, List } from "antd";
import { BookFilled, BookOutlined, FolderOutlined } from "@ant-design/icons";
import { Folder } from "@/app/lib/types/dataTypes";
import { folderItemStyle } from "@/app/ui/folderPageStyles";
import { useBookmarks, useChildFolders } from "@/app/lib/data/query";

export default function FolderItem({ folder }: { folder: Folder }) {
  const [showChildren, setShowChildren] = useState(false);

  const { data: childFolders, isLoading: isFoldersLoading } = useChildFolders(
    folder.id
  );

  const { data: bookmarks, isLoading: isBookmarksLoading } = useBookmarks(
    folder.id
  );

  return (
    <List.Item.Meta
      avatar={<FolderOutlined />}
      title={
        <div
          onClick={() => setShowChildren((prev) => !prev)}
          style={folderItemStyle}
        >
          {folder.name}
        </div>
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
