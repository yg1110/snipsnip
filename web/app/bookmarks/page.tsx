'use client';

import Cookies from 'js-cookie';
import { Button, Flex, Layout, Space, Typography } from 'antd';
import {
  headerStyle,
  layoutStyle,
  flexStyle,
  contentStyle,
  logoStyle,
} from '@/app/ui/mainLayoutStyle';
import { useRouter } from 'next/navigation';
import '../ui/mobile.css';
import FolderList from '@/components/folder/FolderList';

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
