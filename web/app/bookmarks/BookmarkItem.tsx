import { MoreOutlined } from '@ant-design/icons';
import { Button, Dropdown, Flex, List, MenuProps } from 'antd';
import { Bookmark } from '@/app/lib/types/dataTypes';
import EditBookmarkBtn from './EditBookmarkBtn';
import DeleteBookmarkBtn from './DeleteBookmarkBtn';
import {
  bookmarkDescriptionStyle,
  bookmarkItemStyle,
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

  const goToBookmarkPage = () => {
    window.open(bookmark.metadata.url, '_blank');
  };

  return (
    <List.Item>
      <List.Item.Meta
        title={
          <Flex justify="space-between" align="center">
            <Flex
              gap="8px"
              align="center"
              onClick={goToBookmarkPage}
              style={bookmarkItemStyle}
            >
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
