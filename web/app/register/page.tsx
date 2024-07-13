"use client";

import { Button, Flex, Layout, Typography, Input, Form, message } from "antd";
import {
  layoutStyle,
  headerStyle,
  contentStyle,
  flexStyle,
  submitButtonStyle,
} from "@/app/ui/loginLayoutStyle";
import Link from "next/link";
import { RegisterRequest } from "../lib/types/authTypes";
import { useRegister } from "../lib/data/mutation";
import { useRouter } from "next/navigation";

const { Header, Content } = Layout;
const { Title } = Typography;

type RegisterFormValue = {
  email: string;
  password: string;
  passwordConfirm: string;
};
export default function Page() {
  const router = useRouter();
  const registerMutation = useRegister();

  const submit = (command: RegisterRequest) => {
    registerMutation.mutate(command, {
      onSuccess: () => {
        router.push("/login");
      },
      onError: (err) => {
        message.error("회원가입에 실패했습니다.");
      },
    });
  };

  return (
    <Flex style={flexStyle}>
      <Layout style={layoutStyle}>
        <Header style={headerStyle}>
          <Title>Enter to SnipSnip!</Title>
        </Header>
        <Content style={contentStyle}>
          <Form<RegisterFormValue>
            layout="vertical"
            autoComplete="off"
            onFinish={submit}
          >
            <Form.Item
              name="email"
              label="이메일"
              rules={[
                { required: true, message: "이메일을 입력해주세요." },
                { type: "email", message: "유효한 이메일을 입력해주세요." },
              ]}
            >
              <Input size="large" placeholder="이메일" />
            </Form.Item>
            <Form.Item
              name="password"
              label="패스워드"
              rules={[
                { required: true, message: "비밀번호를 입력해주세요." },
                {
                  pattern:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                  message:
                    "비밀번호는 최소 8자 이상, 영문 대문자, 소문자, 숫자 및 특수문자를 포함해야 합니다.",
                },
              ]}
            >
              <Input size="large" placeholder="패스워드" />
            </Form.Item>
            <Form.Item
              name="passwordConfirm"
              label="패스워드 확인"
              rules={[
                { required: true, message: "비밀번호 확인을 입력해주세요." },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("비밀번호가 일치하지 않습니다.")
                    );
                  },
                }),
              ]}
            >
              <Input size="large" placeholder="패스워드 확인" />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                size="large"
                block
                htmlType="submit"
                style={submitButtonStyle}
              >
                회원가입
              </Button>
            </Form.Item>
          </Form>
          <Flex justify="right" gap="8px">
            <Link href="/login">로그인하러가기</Link>
          </Flex>
        </Content>
      </Layout>
    </Flex>
  );
}
