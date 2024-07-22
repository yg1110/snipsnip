import { BookFilled, MoreOutlined } from "@ant-design/icons";
import { Button, Dropdown, Flex, List, MenuProps, Typography } from "antd";
import { Bookmark } from "@/app/lib/types/dataTypes";
import EditBookmarkBtn from "./EditBookmarkBtn";
import DeleteBookmarkBtn from "./DeleteBookmarkBtn";

export default function BookmarkItem({ bookmark }: { bookmark: Bookmark }) {
  const bookmarkMenuButtonGroup: MenuProps["items"] = [
    {
      label: <EditBookmarkBtn bookmark={bookmark} />,
      key: "0",
    },
    {
      label: <DeleteBookmarkBtn bookmarkId={bookmark.id} />,
      key: "1",
    },
  ];

  return (
    <List.Item>
      <List.Item.Meta
        avatar={<BookFilled />}
        title={
          <Flex justify="space-between">
            <Typography.Text>{bookmark.title}</Typography.Text>
            <Dropdown
              menu={{ items: bookmarkMenuButtonGroup }}
              trigger={["click"]}
            >
              <Button type="text" icon={<MoreOutlined />} size="small" />
            </Dropdown>
          </Flex>
        }
      />
    </List.Item>
  );
}
