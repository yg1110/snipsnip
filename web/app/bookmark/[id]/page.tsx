'use client';

import '@/styles/mobile.css';

import { Button, Flex, Layout, Space, Typography } from 'antd';
import { useRouter } from 'next/navigation';

import BookmarkDetail from '@/components/bookmark/BookmarkDetail';
import { useBookmark } from '@/state/queries/bookmarkQuery';
import { contentStyle, flexStyle, headerStyle, layoutStyle, logoStyle } from '@/styles/mainLayoutStyle';

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
        <Header style={headerStyle}>
          <Flex justify="space-between">
            <Space>
              <Title level={3} style={logoStyle}>
                SnipSnip
              </Title>
            </Space>
            <Space>
              <Button onClick={goBookmarkListPage}>목록으로</Button>
            </Space>
          </Flex>
        </Header>
        <Content style={contentStyle}>
          <Flex vertical>{bookmark && <BookmarkDetail bookmark={bookmark} />}</Flex>
        </Content>
      </Layout>
    </Flex>
  );
}
