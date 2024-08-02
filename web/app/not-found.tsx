'use client';

import { Button, Flex, Layout, Space, Typography } from 'antd';
import {
  headerStyle,
  layoutStyle,
  flexStyle,
  logoStyle,
  notFoundContentStyle,
} from '@/app/ui/mainLayoutStyle';
import { useRouter } from 'next/navigation';
import NotFound from './404/404';
import './ui/mobile.css';

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
