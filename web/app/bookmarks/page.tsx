'use client';

import '@/styles/mobile.css';

import { Button, Flex, Layout, Space, Typography } from 'antd';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

import FolderList from '@/components/folder/FolderList';
import { contentStyle, flexStyle, headerStyle, layoutStyle, logoStyle } from '@/styles/mainLayoutStyle';

const { Header, Content } = Layout;
const { Title } = Typography;

export default function Page() {
  const router = useRouter();

  const onLogout = () => {
    Cookies.remove('accessToken');
    Cookies.remove('refreshToken');
    Cookies.remove('id');
    router.replace('/login');
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
              <Button onClick={onLogout}>로그아웃</Button>
            </Space>
          </Flex>
        </Header>
        <Content style={contentStyle}>
          <Flex vertical>
            <FolderList />
          </Flex>
        </Content>
      </Layout>
    </Flex>
  );
}
