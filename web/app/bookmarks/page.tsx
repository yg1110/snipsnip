"use client";

import {
  Button,
  Col,
  Flex,
  Image,
  Layout,
  Row,
  Space,
  Tree,
  Typography,
} from "antd";
import {
  folderTreeColumnStyle,
  headerStyle,
  imageColumnStyle,
  layoutStyle,
} from "@/app/ui/mainLayoutStyle";
import type { TreeDataNode } from "antd";

const { Header, Content } = Layout;
const { Title } = Typography;
const { DirectoryTree } = Tree;

const bookmarks: TreeDataNode[] = [
  {
    title: "리액트",
    key: "0-0",
    children: [
      {
        title: "넥스트",
        key: "0-0-0",
        children: [
          { title: "넥스트 배포하기", key: "0-0-0-0", isLeaf: true },
          { title: "넥스트 프로젝트 설정", key: "0-0-0-1", isLeaf: true },
          { title: "nextjs from scratch", key: "0-0-0-2", isLeaf: true },
        ],
      },
      {
        title: "리액트 관련",
        key: "0-0-1",
        children: [{ title: "리액트 톺아보기", key: "0-0-1-0", isLeaf: true }],
      },
      {
        title: "리액트 라이브러리",
        key: "0-0-2",
        children: [
          { title: "아폴로 클라이언트", key: "0-0-2-0", isLeaf: true },
          { title: "리액트 쿼리", key: "0-0-2-1", isLeaf: true },
        ],
      },
    ],
  },
  {
    title: "자바스크립트",
    key: "0-1",
    children: [
      {
        title: "타입스크립트",
        key: "0-1-0",
        children: [
          { title: "타입스크립트 기초", key: "0-1-0-0", isLeaf: true },
          { title: "타입스크립트 핸드북", key: "0-1-0-1", isLeaf: true },
        ],
      },
      { title: "이벤트 버블링", key: "0-1-1", isLeaf: true },
      { title: "클로저", key: "0-1-2", isLeaf: true },
      { title: "실행 컨텍스트", key: "0-1-3", isLeaf: true },
      { title: "this의 이해", key: "0-1-4", isLeaf: true },
    ],
  },
  {
    title: "여행",
    key: "0-2",
    children: [
      {
        title: "후지산 등반 정보",
        key: "0-2-0",
        isLeaf: true,
      },
      {
        title: "옐로스톤 국립공원에서 한 달 살기",
        key: "0-2-1",
        isLeaf: true,
      },
      {
        title: "남극정복 후기",
        key: "0-2-2",
        isLeaf: true,
      },
    ],
  },
  {
    title: "엔믹스",
    key: "0-3",
    children: [
      {
        title: "dash",
        key: "0-3-0",
        isLeaf: true,
      },
      {
        title: "love me like this",
        key: "0-3-1",
        isLeaf: true,
      },
      {
        title: "cool(your rainbow)",
        key: "0-3-2",
        isLeaf: true,
      },
      {
        title: "직캠",
        key: "0-3-3",
        children: [
          { title: "고려대 입실렌티", key: "0-3-3-0", isLeaf: true },
          { title: "연세대 아카라카", key: "0-3-3-1", isLeaf: true },
        ],
      },
    ],
  },
];

export default function Page() {
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
            <DirectoryTree
              showLine={true}
              // defaultExpandedKeys={["0-0-0"]}
              defaultExpandAll
              treeData={bookmarks}
            />
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
