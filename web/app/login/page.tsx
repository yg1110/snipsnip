"use client";

import { Button, Flex, Layout, Typography, Input, Space } from "antd";
import {
  layoutStyle,
  headerStyle,
  contentStyle,
  flexStyle,
  inputStyle,
} from "@/app/ui/loginLayoutStyle";
import { useMemo } from "react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { AuthApiClient } from "../api/auth/AuthApiClient";
import { LoginRequset } from "../api/auth/domain/AuthRequset";
import generateApiClientFetcher from "../lib/generateApiClientFetcher";

const { Header, Content } = Layout;
const { Title, Text } = Typography;

export default function Login() {
  const router = useRouter();
  const authApi = useMemo(
    () =>
      new AuthApiClient(
        generateApiClientFetcher(process.env.NEXT_PUBLIC_BASE_API)
      ),
    []
  );

  const { mutate: login } = useMutation({
    mutationFn: (command: LoginRequset) => authApi.login(command),
    onSuccess: () => {
      router.push("/bookmarks");
    },
    onError: (err) => {
      // TODO: show error toast
      console.log("error", err);
    },
  });

  const onLogin = () => {
    // TODO: validate email and password
    // TODO: state management
    login({
      email: "yg@naver.com",
      password: "yg",
    });
  };

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
              <Button type="text" onClick={onLogin}>
                login
              </Button>
              <Button type="primary" href="/register">
                register
              </Button>
            </Space.Compact>
          </Space>
        </Content>
      </Layout>
    </Flex>
  );
}
