import { MoreOutlined } from '@ant-design/icons';
import { Button, Dropdown, Flex, List, MenuProps, Typography } from 'antd';
import { Bookmark } from '@/app/lib/types/dataTypes';
import EditBookmarkBtn from './EditBookmarkBtn';
import DeleteBookmarkBtn from './DeleteBookmarkBtn';
import {
  bookmarkDescriptionStyle,
  bookmarkThumbnailStyle,
  bookmarkTitleStyle,
} from '../ui/bookmarkStyles';

export default function BookmarkItem({ bookmark }: { bookmark: Bookmark }) {
  const imagePath =
    bookmark?.metadata?.thumbnail || 'image/default-thumbnail.png';
  const bookmarkMenuButtonGroup: MenuProps['items'] = [
    {
      label: <EditBookmarkBtn bookmark={bookmark} />,
      key: '0',
    },
    {
      label: <DeleteBookmarkBtn bookmarkId={bookmark.id} />,
      key: '1',
    },
  ];

  return (
    <List.Item>
      <List.Item.Meta
        title={
          <Flex justify="space-between" align="center">
            <Flex gap="8px" align="center">
              <img
                width={50}
                height={50}
                src={imagePath}
                alt="metadata-thumbnail"
                style={bookmarkThumbnailStyle}
              />
              <Flex vertical>
                <h1 style={bookmarkTitleStyle}>
                  {bookmark.title || bookmark.metadata.description}
                </h1>
                <p style={bookmarkDescriptionStyle}>
                  {bookmark.metadata.description || '-'}
                </p>
              </Flex>
              <Typography.Text></Typography.Text>
            </Flex>
            <Dropdown
              menu={{ items: bookmarkMenuButtonGroup }}
              trigger={['click']}
            >
              <Button type="text" icon={<MoreOutlined />} size="small" />
            </Dropdown>
          </Flex>
        }
      />
    </List.Item>
  );
}
