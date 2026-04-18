import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { cn } from '@/lib/utils';
import { AppHeader } from '@/components/app-header';
import { SubjectSidebar } from '@/components/subject-sidebar';
import { DashboardLayoutProvider } from '@/contexts/DashboardLayoutContext';
import { getSubjects } from '@/lib/services';
import { FirebaseClientProvider } from '@/firebase';
import { Analytics } from '@vercel/analytics/next';

export const metadata: Metadata = {
  title: 'Assignment Help',
  description: 'Your personal academic assistant.',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const subjects = await getSubjects();
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=Space+Grotesk:wght@500;700&display=swap" rel="stylesheet" />
      </head>
      <body className={cn("font-body antialiased")}>
        <FirebaseClientProvider>
          <DashboardLayoutProvider initialSubjects={subjects}>
            <div className="flex h-screen w-full flex-col bg-background text-foreground">
              <AppHeader />
              <div className="flex flex-grow h-[calc(100vh-4rem)] overflow-hidden">
                <SubjectSidebar />
                <main className="flex-grow flex-1 bg-muted/30 overflow-y-auto">
                  {children}
                </main>
              </div>
            </div>
          </DashboardLayoutProvider>
        </FirebaseClientProvider>
        <Toaster />
        <Analytics />
      </body>
    </html>
  );
}
