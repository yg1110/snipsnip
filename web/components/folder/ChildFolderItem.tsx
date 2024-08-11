import {
  forwardRef,
  ForwardRefRenderFunction,
  useContext,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from 'react';
import {
  CaretDownOutlined,
  CaretRightOutlined,
  FolderOutlined,
  HolderOutlined,
  MoreOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { Button, Dropdown, Flex, List, MenuProps, Space } from 'antd';
import { Folder } from '@/types/folderTypes';
import BookmarkList from '../bookmark/BookmarkList';
import { folderCountStyle, folderIconStyle } from '@/styles/folderPageStyles';
import React from 'react';
import { CSS } from '@dnd-kit/utilities';
import { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities';
import { useSortable } from '@dnd-kit/sortable';
import AddChildBookmarkCBtn from '@/components/buttons/AddChildBookmarkBtn';
import DeleteFolderBtn from '@/components/buttons/DeleteFolderBtn';
import EditFolderBtn from '@/components/buttons/EditFolderBtn';
import { useStore } from '@/stores/useStore';

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

export type ChildFolderItemRef = {
  setShowChildren: (value: boolean) => void;
};

const ChildFolderItem: ForwardRefRenderFunction<
  ChildFolderItemRef,
  { folder: Folder }
> = ({ folder }, ref): JSX.Element => {
  const { isAllExpanded } = useStore();
  const [showChildren, setShowChildren] = useState(true);

  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    isDragging,
  } = useSortable({
    id: folder.id.toString(),
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

  const folderMenuButtonGroup: MenuProps['items'] = [
    {
      label: <EditFolderBtn folder={folder} />,
      key: '0',
    },
    {
      label: <DeleteFolderBtn folderId={folder.id} />,
      key: '1',
    },
  ];

  const folderUnAddableGruop: MenuProps['items'] = [
    {
      label: (
        <AddChildBookmarkCBtn
          parentFolderId={folder.id}
          setShowChildren={setShowChildren}
        />
      ),
      key: '0',
    },
  ];

  useImperativeHandle(
    ref,
    () => ({
      setShowChildren: setShowChildren,
    }),
    [showChildren],
  );

  useEffect(() => {
    isAllExpanded ? setShowChildren(true) : setShowChildren(false);
  }, [isAllExpanded]);

  const hasChildren = folder.subFolderCount + folder.bookmarkCount > 0;
  return (
    <List.Item ref={setNodeRef} style={style} {...attributes}>
      <RowContext.Provider value={contextValue}>
        <List.Item.Meta
          avatar={
            <>
              <DragHandle />
              {showChildren ? (
                <>
                  {hasChildren && (
                    <CaretDownOutlined
                      style={folderIconStyle}
                      onClick={() => setShowChildren(prev => !prev)}
                    />
                  )}
                  <FolderOutlined />
                </>
              ) : (
                <>
                  {hasChildren && (
                    <CaretRightOutlined
                      style={folderIconStyle}
                      onClick={() => setShowChildren(prev => !prev)}
                    />
                  )}
                  <FolderOutlined />
                </>
              )}
            </>
          }
          title={
            <Flex justify="space-between">
              <Space
                onClick={() =>
                  hasChildren ? setShowChildren(prev => !prev) : null
                }
              >
                {folder.name}
                {folder.bookmarkCount > 0 && (
                  <span style={folderCountStyle}>({folder.bookmarkCount})</span>
                )}
              </Space>
              <Space direction="horizontal">
                <Dropdown
                  menu={{ items: folderUnAddableGruop }}
                  trigger={['click']}
                >
                  <Button type="text" icon={<PlusOutlined />} size="small" />
                </Dropdown>
                <Dropdown
                  menu={{ items: folderMenuButtonGroup }}
                  trigger={['click']}
                >
                  <Button type="text" icon={<MoreOutlined />} size="small" />
                </Dropdown>
              </Space>
            </Flex>
          }
          description={showChildren && <BookmarkList folderId={folder.id} />}
        />
      </RowContext.Provider>
    </List.Item>
  );
};

export default forwardRef(ChildFolderItem);
