"use client";

import Cookies from "js-cookie";

import { Button, Col, Flex, Image, Layout, Row, Space, Typography } from "antd";
import {
  folderTreeColumnStyle,
  headerStyle,
  imageColumnStyle,
  layoutStyle,
} from "@/app/ui/mainLayoutStyle";
import FolderList from "./folderList";
import { useEffect } from "react";

const { Header, Content } = Layout;
const { Title } = Typography;

export default function Page() {
  useEffect(() => {
    if (!Cookies.get("accessToken")) {
      location.href = "/login";
    }
  }, []);
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
      <Content>
        <Row>
          <Col span={12} style={folderTreeColumnStyle}>
            <FolderList />
          </Col>
          <Col span={12} style={imageColumnStyle}>
            <Image
              src="https://via.placeholder.com/420?text=snapshot"
              width={420}
              preview={false}
              alt="empty-box"
            />
          </Col>
        </Row>
      </Content>
    </Layout>
  );
}
