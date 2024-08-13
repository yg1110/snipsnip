import { HolderOutlined, MoreOutlined } from '@ant-design/icons';
import { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Button, Dropdown, Flex, List, MenuProps } from 'antd';
import { useRouter } from 'next/navigation';
import { useContext, useMemo } from 'react';
import React from 'react';

import DeleteBookmarkBtn from '@/components/buttons/DeleteBookmarkBtn';
import EditBookmarkBtn from '@/components/buttons/EditBookmarkBtn';
import { extractPlainTextFromHTML } from '@/shared/htmlTextTagParser';
import {
  bookmarkContentsStyle,
  bookmarkContentTextStyle,
  bookmarkDescriptionStyle,
  bookmarkItemStyle,
  bookmarkThumbnailStyle,
  bookmarkTitleStyle,
} from '@/styles/bookmarkStyles';
import { fullWidthStyle } from '@/styles/commonStyles';
import { Bookmark } from '@/types/bookmarkTypes';

interface RowContextProps {
  setActivatorNodeRef?: (element: HTMLElement | null) => void;
  listeners?: SyntheticListenerMap;
  children?: JSX.Element;
}

const RowContext = React.createContext<RowContextProps>({});

const DragHandle: React.FC = () => {
  const { setActivatorNodeRef, listeners } = useContext(RowContext);
  return (
    <Button
      className="drag-handle"
      type="text"
      size="small"
      icon={<HolderOutlined />}
      style={{ cursor: 'move' }}
      ref={setActivatorNodeRef}
      {...listeners}
    />
  );
};

export default function BookmarkItem({ bookmark }: { bookmark: Bookmark }) {
  const router = useRouter();
  const imagePath = bookmark?.metadata?.thumbnail || 'image/default-thumbnail.png';
  const bookmarkMenuButtonGroup: MenuProps['items'] = [
    {
      label: <EditBookmarkBtn bookmark={bookmark} />,
      key: '0',
    },
    {
      label: <DeleteBookmarkBtn bookmarkId={bookmark.id} />,
      key: '1',
    },
  ];

  const goToBookmarkPage = () => {
    router.push(`/bookmark/${bookmark.id}`);
  };

  const { attributes, listeners, setNodeRef, setActivatorNodeRef, transform, isDragging } = useSortable({
    id: bookmark.id.toString(),
  });

  const style: React.CSSProperties = {
    transform: CSS.Translate.toString(transform),
    ...(isDragging ? { zIndex: 9999 } : {}),
    background: '#fff',
    width: '100%',
  };

  const contextValue = useMemo<RowContextProps>(
    () => ({ setActivatorNodeRef, listeners }),
    [setActivatorNodeRef, listeners],
  );

  return (
    <List.Item>
      <List.Item.Meta
        title={
          <RowContext.Provider value={contextValue}>
            <Flex gap={8} align="center" ref={setNodeRef} style={style} {...attributes}>
              <DragHandle />
              <Flex justify="space-between" align="center" style={fullWidthStyle}>
                <Flex gap="8px" vertical onClick={goToBookmarkPage} style={bookmarkItemStyle}>
                  <Flex gap="8px" align="center">
                    <img
                      width={50}
                      height={50}
                      src={imagePath}
                      alt="metadata-thumbnail"
                      style={bookmarkThumbnailStyle}
                    />
                    <Flex vertical>
                      <h1 style={bookmarkTitleStyle}>{bookmark.title || bookmark.metadata.description}</h1>
                      <p style={bookmarkDescriptionStyle}>{bookmark.metadata.description || '-'}</p>
                    </Flex>
                  </Flex>
                  {bookmark.contents && (
                    <Flex style={bookmarkContentsStyle}>
                      <p style={bookmarkContentTextStyle}>{extractPlainTextFromHTML(bookmark.contents.toString())}</p>
                    </Flex>
                  )}
                </Flex>
                <Dropdown menu={{ items: bookmarkMenuButtonGroup }} trigger={['click']}>
                  <Button type="text" icon={<MoreOutlined />} size="small" />
                </Dropdown>
              </Flex>
            </Flex>
          </RowContext.Provider>
        }
      />
    </List.Item>
  );
}
