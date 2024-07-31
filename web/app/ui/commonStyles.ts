import { CSSProperties } from 'react';

export const lineClamp = (
  lineClamp: number,
): CSSProperties & {
  '-webkit-line-clamp': string;
  '-webkit-box-orient': string;
} => ({
  display: '-webkit-box',
  '-webkit-line-clamp': lineClamp.toString(),
  '-webkit-box-orient': 'vertical',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});
