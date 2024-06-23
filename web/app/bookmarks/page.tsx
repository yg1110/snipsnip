"use client";

import { Button, Flex, Layout, Space, Typography } from "antd";
import { headerStyle, layoutStyle } from "@/app/ui/mainLayoutStyle";

const { Header, Content, Sider } = Layout;
const { Title } = Typography;

export default function Page() {
  return (
    <Layout style={layoutStyle}>
      <Header style={headerStyle}>
        <Flex justify="space-between">
          <Space>
            <Button href="/" type="primary" shape="round" size="large">
              ✂️
            </Button>
            <Title level={3} style={{ marginBottom: 0 }}>
              SnipSnip
            </Title>
          </Space>
          <Space>
            <Button>Login</Button>
          </Space>
        </Flex>
      </Header>
      <Layout>
        <Content></Content>
        <Sider></Sider>
      </Layout>
    </Layout>
  );
}
