'use client';

import '@/styles/mobile.css';

import { Flex, Layout, Space, Typography } from 'antd';
import { useRouter } from 'next/navigation';
import { MdOutlineKeyboardBackspace } from 'react-icons/md';

import BookmarkDetail from '@/components/bookmark/BookmarkDetail';
import { useBookmark } from '@/state/queries/bookmarkQuery';
import { backButtonStyle } from '@/styles/bookmarkStyles';
import { fullWidthStyle } from '@/styles/commonStyles';
import {
  centerHeaderStyle,
  contentStyle,
  flexStyle,
  headerStyle,
  layoutStyle,
  logoStyle,
  titleStyle,
} from '@/styles/mainLayoutStyle';

const { Header, Content } = Layout;
const { Title } = Typography;

export default function Page({ params: { id } }: { params: { id: string } }) {
  const router = useRouter();
  const { data: bookmark } = useBookmark(+id);

  const goBookmarkListPage = () => {
    router.push('/bookmark');
  };

  return (
    <Flex style={flexStyle} className="container">
      <Layout style={layoutStyle}>
        <Header style={centerHeaderStyle}>
          <Flex gap={8} style={fullWidthStyle}>
            <MdOutlineKeyboardBackspace style={backButtonStyle} size={24} onClick={goBookmarkListPage} />
            <Title level={3} style={titleStyle}>
              {bookmark?.title || 'SnipSnip'}
            </Title>
          </Flex>
        </Header>
        <Content style={contentStyle}>
          <Flex vertical>{bookmark && <BookmarkDetail bookmark={bookmark} />}</Flex>
        </Content>
      </Layout>
    </Flex>
  );
}
