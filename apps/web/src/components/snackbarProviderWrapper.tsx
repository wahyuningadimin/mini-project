// components/SnackbarProviderWrapper.tsx
'use client'; // Ensures this component is only rendered on the client side

import { SnackbarProvider } from 'notistack';
import { ReactNode } from 'react';

export default function SnackbarProviderWrapper({ children }: { children: ReactNode }) {
  return <SnackbarProvider maxSnack={1} autoHideDuration={2000}>{children}</SnackbarProvider>;
}
