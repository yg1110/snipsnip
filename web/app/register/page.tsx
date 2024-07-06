"use client";

import { Button, Flex, Layout, Typography, Input, Space } from "antd";
import {
  layoutStyle,
  headerStyle,
  contentStyle,
  flexStyle,
  inputStyle,
} from "@/app/ui/loginLayoutStyle";

const { Header, Content } = Layout;
const { Title, Text } = Typography;

export default function Page() {
  return (
    <Flex style={flexStyle}>
      <Layout style={layoutStyle}>
        <Header style={headerStyle}>
          <Title>Enter to SnipSnip! </Title>
        </Header>
        <Content style={contentStyle}>
          <Space direction="vertical" align="center" size="middle">
            <Space.Compact>
              <div style={inputStyle}>
                <Text>EMAIL</Text>
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
              <div style={inputStyle}>
                <Text>PASSWORD check</Text>
              </div>
              <Input type="password" />
            </Space.Compact>
            <Button type="primary">register</Button>
          </Space>
        </Content>
      </Layout>
    </Flex>
  );
}
