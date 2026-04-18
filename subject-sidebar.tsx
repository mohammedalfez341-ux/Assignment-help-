
'use client';
import { ClientSidebar } from './client-sidebar';
import { useDashboardLayout } from '@/contexts/DashboardLayoutContext';
import { cn } from '@/lib/utils';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';
import { Button } from './ui/button';
import { Menu } from 'lucide-react';


export function SubjectSidebar() {
  const { isSubjectBarVisible } = useDashboardLayout();

  return (
    <>
    <aside className={cn(
      "flex-shrink-0 border-r bg-card hidden md:flex flex-col transition-all duration-300 ease-in-out",
      isSubjectBarVisible ? "w-72" : "w-0"
      )}>
       <ClientSidebar />
    </aside>

    {/* Mobile Sidebar */}
    <div className="md:hidden p-2 absolute top-16 left-0 z-40">
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                    <Menu className="h-6 w-6" />
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-72">
                <SheetHeader className="p-4 border-b">
                    <SheetTitle className="sr-only">Subjects Navigation</SheetTitle>
                </SheetHeader>
                <ClientSidebar />
            </SheetContent>
        </Sheet>
    </div>
    </>
  );
}
