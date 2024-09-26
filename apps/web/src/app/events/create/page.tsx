'use client';

import React from 'react';
import { FormCreate } from './_components/form';
import { SnackbarProvider } from 'notistack';

const HomePage: React.FC = () => {
  return (
    <div className='my-[20px]'>
      <SnackbarProvider autoHideDuration={3000}>
        <FormCreate />
      </SnackbarProvider>
    </div>
  );
};

export default HomePage;