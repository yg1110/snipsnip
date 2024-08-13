import { Button, Flex } from 'antd';
import DOMPurify from 'dompurify';
import React from 'react';

import { bookmarkContentStyle, bookmarkContentWrapperStyle, openLinkButtonStyle } from '@/styles/bookmarkStyles';
import { Bookmark } from '@/types/bookmarkTypes';

type BookmarkDetailProps = {
  bookmark: Bookmark;
};
export default function BookmarkDetail({ bookmark }: BookmarkDetailProps) {
  const sanitizedData = (data: string) => ({
    __html: DOMPurify.sanitize(data, {
      ADD_ATTR: ['target'],
      FORCE_BODY: true,
      ALLOWED_URI_REGEXP: /^(?:(?:(?:https?|ftp):)?\/\/)/,
    }).replace(/<a /g, '<a target="_blank" '),
  });

  const goLinkPage = () => {
    window.open(bookmark.metadata.url, '_blank');
  };

  return (
    <Flex style={bookmarkContentWrapperStyle}>
      <div style={bookmarkContentStyle} dangerouslySetInnerHTML={sanitizedData(bookmark.contents)} />
      <Button style={openLinkButtonStyle} type="primary" className="open-link-button" onClick={goLinkPage}>
        링크 바로가기
      </Button>
    </Flex>
  );
}
