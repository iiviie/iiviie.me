import type { Metadata } from 'next';
import { Geist_Mono } from 'next/font/google';
import '@/styles/globals.css';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import Providers from './providers';
import TerminalInterface from '@/components/TerminalInterface';
import Sidebar from '@/components/Sidebar';
import { DataProvider } from '@/components/DataProvider';
import { getAllPostsServer, getAllProjectsServer } from '@/lib/mdx-server';

const geistMono = Geist_Mono({ subsets: ['latin'], display: 'swap' });

export const metadata: Metadata = {
  title: 'Divyansh Verma - Backend Developer',
  description: 'Backend Developer & API Architect specializing in Python ecosystem',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Fetch data once at root level for all pages
  const [posts, projects] = await Promise.all([
    getAllPostsServer(),
    getAllProjectsServer(),
  ]);

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={geistMono.className} suppressHydrationWarning>
        <Providers>
          <DataProvider posts={posts} projects={projects}>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              {/* Render children (which includes not-found page) when appropriate */}
              {children}
            </TooltipProvider>
          </DataProvider>
        </Providers>
      </body>
    </html>
  );
}
