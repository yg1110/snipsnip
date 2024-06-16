"use client";

import { Button, Flex, Layout, Typography, Input, Space } from "antd";
import {
  layoutStyle,
  headerStyle,
  contentStyle,
  flexStyle,
  inputStyle,
} from "@/app/ui/layoutStyle";

const { Header, Content } = Layout;
const { Title, Text } = Typography;

export default function Home() {
  return (
    <Flex style={flexStyle}>
      <Layout style={layoutStyle}>
        <Header style={headerStyle}>
          <Title>SnipSnip</Title>
        </Header>
        <Content style={contentStyle}>
          <Space direction="vertical" align="center" size="middle">
            <Space.Compact>
              <div style={inputStyle}>
                <Text>ID</Text>
              </div>
              <Input type="text" />
            </Space.Compact>
            <Space.Compact>
              <div style={inputStyle}>
                <Text>PASSWORD</Text>
              </div>
              <Input type="password" />
            </Space.Compact>
            <Space.Compact>
              <Button type="text">login</Button>
              <Button type="primary">register</Button>
            </Space.Compact>
          </Space>
        </Content>
      </Layout>
    </Flex>
  );
}
