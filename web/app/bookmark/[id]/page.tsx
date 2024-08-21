'use client';
import '@/styles/toastui-editor-viewer.css';
import '@/styles/mobile.css';

import { MoreOutlined } from '@ant-design/icons';
import { Button, Dropdown, Flex, Layout, MenuProps, Space, Typography } from 'antd';
import { useRouter } from 'next/navigation';
import { MdOutlineKeyboardBackspace } from 'react-icons/md';

import BookmarkDetail from '@/components/bookmark/BookmarkDetail';
import DeleteBookmarkBtn from '@/components/buttons/DeleteBookmarkBtn';
import EditBookmarkBtn from '@/components/buttons/EditBookmarkBtn';
import { useBookmark } from '@/state/queries/bookmarkQuery';
import { backButtonStyle } from '@/styles/bookmarkStyles';
import { fullWidthStyle } from '@/styles/commonStyles';
import {
  centerHeaderStyle,
  contentStyle,
  flexStyle,
  headerStyle,
  layoutStyle,
  titleStyle,
} from '@/styles/mainLayoutStyle';

const { Header, Content } = Layout;
const { Title } = Typography;

export default function Page({ params: { id } }: { params: { id: string } }) {
  const router = useRouter();
  const { data: bookmark } = useBookmark(+id);

  if (!bookmark) return;

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

  const goBookmarkListPage = () => {
    router.push('/bookmark');
  };

  return (
    <Flex style={flexStyle} className="container">
      <Layout style={layoutStyle}>
        <Header style={centerHeaderStyle}>
          <Flex gap={8}>
            <MdOutlineKeyboardBackspace style={backButtonStyle} size={24} onClick={goBookmarkListPage} />
            <Title level={3} style={titleStyle}>
              {bookmark?.title || 'SnipSnip'}
            </Title>
          </Flex>
          <Dropdown menu={{ items: bookmarkMenuButtonGroup }} trigger={['click']}>
            <Button type="text" icon={<MoreOutlined />} size="small" />
          </Dropdown>
        </Header>
        <Content style={contentStyle}>
          <Flex vertical>{bookmark && <BookmarkDetail bookmark={bookmark} />}</Flex>
        </Content>
      </Layout>
    </Flex>
  );
}
