'use client';

import Cookies from 'js-cookie';
import { Button, Flex, Layout, Typography, Input, Form } from 'antd';
import {
  layoutStyle,
  headerStyle,
  contentStyle,
  flexStyle,
  submitButtonStyle,
  logoStyle,
} from '@/styles/loginLayoutStyle';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useLogin } from '../lib/data/mutation';
import { LoginRequest } from '../lib/types/authTypes';

import '@/styles/mobile.css';

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
      onSuccess: response => {
        const {
          accessToken: newAccessToken,
          refreshToken: newRefreshToken,
          id: newId,
        } = response;
        Cookies.set('accessToken', newAccessToken, {
          expires: new Date(
            Date.now() +
              Number(process.env.NEXT_PUBLIC_ACCESS_TOKEN_EXPIRES_IN) || 0,
          ),
        });
        Cookies.set('refreshToken', newRefreshToken, {
          expires: new Date(
            Date.now() +
              Number(process.env.NEXT_PUBLIC_REFRESH_TOKEN_EXPIRES_IN) || 0,
          ),
        });
        Cookies.set('id', newId.toString(), {
          expires: new Date(
            Date.now() +
              Number(process.env.NEXT_PUBLIC_REFRESH_TOKEN_EXPIRES_IN) || 0,
          ),
        });
        router.push('/bookmarks');
      },
    });
  };

  const goTourPage = () => {
    submit({
      email: 'tour',
      password: 'tour',
    });
  };

  return (
    <Flex style={flexStyle} className="container">
      <Layout style={layoutStyle}>
        <Header style={headerStyle}>
          <Title style={logoStyle}>SnipSnip</Title>
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
              rules={[{ required: true, message: '이메일을 입력해주세요.' }]}
            >
              <Input size="large" placeholder="이메일" />
            </Form.Item>
            <Form.Item
              name="password"
              label="비밀번호"
              rules={[{ required: true, message: '비밀번호를 입력해주세요.' }]}
            >
              <Input.Password size="large" placeholder="비밀번호" />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                size="large"
                block
                htmlType="submit"
                style={submitButtonStyle}
              >
                로그인
              </Button>
            </Form.Item>
          </Form>
          <Flex justify="center" gap="16px" vertical>
            <Link href="/register">회원가입 하러가기</Link>
            <Link href="" onClick={goTourPage}>
              로그인 하지 않고 둘러보기
            </Link>
          </Flex>
        </Content>
      </Layout>
    </Flex>
  );
}
