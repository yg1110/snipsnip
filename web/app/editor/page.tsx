'use client';
import '@toast-ui/editor/dist/i18n/ko-kr';
import '@toast-ui/editor/dist/toastui-editor.css';
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';

import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import { Editor as ToastEditor } from '@toast-ui/react-editor';
import { Editor } from '@toast-ui/react-editor';

import Cookies from 'js-cookie';
import { Button, Flex, Layout, Space, Typography } from 'antd';
import {
  headerStyle,
  layoutStyle,
  flexStyle,
  contentStyle,
  logoStyle,
} from '@/app/ui/mainLayoutStyle';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';
import { useHtml } from '../lib/data/query';

const { Header, Content } = Layout;
const { Title } = Typography;

export default function Page() {
  const router = useRouter();
  const editorRef = useRef<ToastEditor>(null);

  const { data: crawlerData } = useHtml(
    'https://support.microsoft.com/ko-kr/office/%EC%B0%A8%ED%8A%B8-%EC%82%AD%EC%A0%9C-eea1ec2f-fc41-4a8d-ba4b-fcdc7b12d9bf',
  );

  const onLogout = () => {
    Cookies.remove('accessToken');
    Cookies.remove('refreshToken');
    Cookies.remove('id');
    router.replace('/login');
  };

  const onEditorChange = () => {
    const data = editorRef.current?.getInstance().getHTML();
    console.log('data :>> ', data);
  };

  const onUploadImage = async (
    blob: Blob,
    callback: (imageUrl: string, imageType: string) => void,
  ) => {};

  const getHtml = () => {
    console.log('crawlerData :>> ', crawlerData?.data);
    if (!crawlerData) return;
    console.log('crawlerData.data :>> ', crawlerData.data);
    editorRef.current?.getInstance().setHTML(crawlerData.data);
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
            <Button onClick={getHtml}>get html</Button>
            <Editor
              ref={editorRef}
              onChange={onEditorChange}
              initialValue={' '}
              previewStyle="tab"
              height="500px"
              initialEditType="wysiwyg"
              hideModeSwitch={true}
              usageStatistics={false}
              plugins={[colorSyntax]}
              hooks={{ addImageBlobHook: onUploadImage }}
            />
          </Flex>
        </Content>
      </Layout>
    </Flex>
  );
}
