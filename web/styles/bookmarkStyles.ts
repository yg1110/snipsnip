import { lineClamp } from './commonStyles';

export const bookmarkThumbnailStyle: React.CSSProperties = {
  width: '50px',
  height: '50px',
  borderRadius: '12px',
  flexShrink: 0,
};

export const bookmarkTitleStyle: React.CSSProperties = {
  fontSize: '16px',
  color: '#343a40',
  ...lineClamp(1),
};

export const bookmarkDescriptionStyle: React.CSSProperties = {
  fontSize: '12px',
  color: '#adb5bd',
  ...lineClamp(1),
};

export const bookmarkItemStyle: React.CSSProperties = {
  cursor: 'pointer',
  width: '100%',
};

export const bookmarkUrlInputStyle: React.CSSProperties = {
  width: '100%',
};

export const bookmarkUrlCheckButtonStyle: React.CSSProperties = {
  marginBottom: '24px',
  flexShrink: 0,
};

export const bookmarkContentsStyle: React.CSSProperties = {
  background: '#f8f9fa',
  width: '100%',
  padding: '12px 16px',
  borderRadius: '8px',
};

export const bookmarkContentTextStyle: React.CSSProperties = {
  color: '#495057',
  whiteSpace: 'pre-wrap',
  ...lineClamp(2),
};

export const bookmarkContentWrapperStyle: React.CSSProperties = {
  padding: '20px',
};

export const bookmarkContentStyle: React.CSSProperties = {
  paddingBottom: '10vh',
};

export const openLinkButtonStyle: React.CSSProperties = {
  position: 'fixed',
  bottom: '10vh',
  height: '40px',
  width: 'calc(70vw)',
  left: 0,
  right: 0,
  margin: '0 auto',
  zIndex: 100,
};

export const backButtonStyle: React.CSSProperties = {
  cursor: 'pointer',
  marginTop: '4px',
  flexShrink: 0,
};
