'use client';

import { SessionProvider } from 'next-auth/react';
import Navbar from '@/components/Navbar';

export const metadata = {
  title: 'Travel Planner',
  description: 'Plan your dream trip!',
};

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <Navbar />
      <main>{children}</main>
    </SessionProvider>
  );
}
