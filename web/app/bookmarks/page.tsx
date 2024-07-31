"use client";

import Cookies from "js-cookie";
import { Button, Flex, Layout, Space, Typography } from "antd";
import {
  headerStyle,
  layoutStyle,
  flexStyle,
  contentStyle,
  logoStyle,
} from "@/app/ui/mainLayoutStyle";
import FolderList from "./FolderList";
import { useRouter } from "next/navigation";

const { Header, Content } = Layout;
const { Title } = Typography;

export default function Page() {
  const router = useRouter();

  const onLogout = () => {
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    Cookies.remove("id");
    router.replace("/login");
  };
  return (
    <Flex style={flexStyle}>
      <Layout style={layoutStyle}>
        <Header style={headerStyle}>
          <Flex justify="space-between">
            <Space>
              <Title level={3} style={logoStyle}>
                SnipSnip
              </Title>
            </Space>
            <Space>
              <Button onClick={onLogout}>Logout</Button>
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
