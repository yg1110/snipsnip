'use client';

import Cookies from 'js-cookie';
import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    if (Cookies.get('accessToken')) {
      location.href = '/bookmark';
    } else {
      location.href = '/login';
    }
  }, []);
  return <></>;
}
