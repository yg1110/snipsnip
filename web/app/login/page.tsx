"use client";

import { Button, Flex, Layout, Typography, Input, Form, message } from "antd";
import {
  layoutStyle,
  headerStyle,
  contentStyle,
  flexStyle,
} from "@/app/ui/loginLayoutStyle";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useLogin } from "../lib/data/mutation";
import { LoginRequest } from "../lib/types/userTypes";

const { Header, Content } = Layout;
const { Title } = Typography;

type LoginFormValue = {
  email: string;
  password: string;
};
export default function Login() {
  const router = useRouter();
  const loginMutation = useLogin();

  const submit = (command: LoginRequest) => {
    loginMutation.mutate(command, {
      onSuccess: () => {
        router.push("/bookmarks");
      },
      onError: (err) => {
        message.error("로그인에 실패했습니다.");
      },
    });
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
