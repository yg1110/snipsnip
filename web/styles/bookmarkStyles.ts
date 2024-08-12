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
