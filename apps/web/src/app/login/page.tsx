'use client';

import React, { useEffect, useState } from 'react';
import { LoginForm } from './_components/form';
import { SnackbarProvider } from 'notistack';
import { useSearchParams } from 'next/navigation';

const LoginPage: React.FC = () => {
  const [redirectUrl, setRedirectUrl] = useState<string>('');
  const searchParams = useSearchParams();

  useEffect(() => {
    const redirectUrl = searchParams.get('redirectUrl');
    if (redirectUrl) {
      setRedirectUrl(redirectUrl);
    }
}, [searchParams]);

  return (
    <div className='my-[20px]'>
      <SnackbarProvider autoHideDuration={3000}>
        <LoginForm redirectUrl={redirectUrl} />
      </SnackbarProvider>
    </div>
  );
};

export default LoginPage;