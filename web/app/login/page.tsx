"use client";

import { Button, Flex, Layout, Typography, Input, Form } from "antd";
import {
  layoutStyle,
  headerStyle,
  contentStyle,
  flexStyle,
} from "@/app/ui/loginLayoutStyle";
import { useMemo } from "react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { AuthApiClient } from "../api/auth/AuthApiClient";
import { LoginRequset } from "../api/auth/domain/AuthRequset";
import generateApiClientFetcher from "../lib/generateApiClientFetcher";
import { LoginRequest } from "../api/auth/domain/entities";
import Link from "next/link";

const { Header, Content } = Layout;
const { Title } = Typography;

type LoginFormValue = {
  email: string;
  password: string;
};
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

  const submit = (command: LoginRequest) => {
    login(command);
  };

  return (
    <Flex style={flexStyle}>
      <Layout style={layoutStyle}>
        <Header style={headerStyle}>
          <Title>SnipSnip</Title>
        </Header>
        <Content style={contentStyle}>
          <Form<LoginFormValue>
            layout="vertical"
            autoComplete="off"
            onFinish={submit}
          >
            <Form.Item
              name="email"
              label="이메일"
              rules={[{ required: true, message: "이메일을 입력해주세요." }]}
            >
              <Input size="large" placeholder="이메일" />
            </Form.Item>
            <Form.Item
              name="password"
              label="비밀번호"
              rules={[{ required: true, message: "비밀번호를 입력해주세요." }]}
            >
              <Input.Password size="large" placeholder="비밀번호" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" size="large" block htmlType="submit">
                로그인
              </Button>
            </Form.Item>
          </Form>
          <Flex justify="right" gap="8px">
            <Link href="/">비밀번호 찾기</Link>
            <Link href="/register">회원가입</Link>
          </Flex>
        </Content>
      </Layout>
    </Flex>
  );
}
