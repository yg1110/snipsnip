'use client';

import '@/styles/mobile.css';

import { Button, Flex, Layout, Space, Typography } from 'antd';
import { useRouter } from 'next/navigation';

import NotFound from '@/components/404/NotFound';
import { flexStyle, headerStyle, layoutStyle, logoStyle, notFoundContentStyle } from '@/styles/mainLayoutStyle';
const { Header, Content } = Layout;
const { Title } = Typography;

function NotFoundPage() {
  const router = useRouter();

  const goBackPage = () => {
    router.back();
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
              <Button type="default" onClick={goBackPage}>
                이전 페이지
              </Button>
            </Space>
          </Flex>
        </Header>
        <Content style={notFoundContentStyle}>
          <Flex vertical>
            <NotFound />
          </Flex>
        </Content>
      </Layout>
    </Flex>
  );
}

export default NotFoundPage;
