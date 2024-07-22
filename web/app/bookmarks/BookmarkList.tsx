import { BookFilled } from "@ant-design/icons";
import { List } from "antd";
import { useBookmarks } from "@/app/lib/data/query";

export default function BookmarkList({ folderId }: { folderId: number }) {
  const { data: bookmarks, isLoading: isBookmarksLoading } =
    useBookmarks(folderId);

  return (
    <>
      {bookmarks?.length ? (
        <List
          itemLayout="horizontal"
          dataSource={bookmarks}
          loading={isBookmarksLoading}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta avatar={<BookFilled />} title={item.title} />
            </List.Item>
          )}
        />
      ) : null}
    </>
  );
}
