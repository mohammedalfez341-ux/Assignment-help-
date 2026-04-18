
'use client';
import Link from 'next/link';
import { useDashboardLayout } from '@/contexts/DashboardLayoutContext';
import {
  Home,
  BookOpen,
  BrainCircuit,
  Beaker,
  FlaskConical,
  MessageSquare,
  PencilRuler,
  User,
  BookOpenCheck,
} from 'lucide-react';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';


const iconMap: { [key: string]: React.ElementType } = {
    'Applied Mathematics': BrainCircuit,
    'Applied Physics': Beaker,
    'Applied Chemistry': FlaskConical,
    'Communication English': MessageSquare,
    'Eng. Graphics': PencilRuler,
};

export function AppHeader() {
  const { subjects, setCurrentSubjectId, toggleSubjectBar, setCurrentAssignmentSlotId } = useDashboardLayout();

  const handleSubjectClick = (subjectId: string) => {
    setCurrentSubjectId(subjectId);
  }

  const handleHomeClick = () => {
    setCurrentAssignmentSlotId(null);
  };

  const getResponsiveClasses = (index: number) => {
    const baseClasses = "text-primary-foreground hover:bg-accent/80 inline-flex items-center justify-center gap-1 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-3 border border-primary-foreground";
    
    // Keeping all items visible across breakpoints by default
    return cn(baseClasses);
  };

  return (
    <header className="bg-primary text-primary-foreground shadow-md sticky top-0 z-50">
      <nav className="w-full px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <div className="flex items-center gap-6">
            <Button
              variant="ghost"
              onClick={toggleSubjectBar}
              className="hover:bg-primary/80 transition-opacity flex items-center gap-2 focus:outline-none p-0 text-base active:bg-primary/70"
            >
              <BookOpenCheck className="h-6 w-6" />
              <span className="text-lg font-headline">Assignment Help</span>
            </Button>
        </div>
        <div className="flex-1 flex justify-start items-center ml-6">
            <div className="hidden md:flex items-center justify-center gap-8">
              <Link
                href="/"
                onClick={handleHomeClick}
                className="text-primary-foreground hover:bg-accent/80 inline-flex items-center justify-center gap-1 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-3 ml-[27%] border border-primary-foreground"
              >
                <Home width="16" height="16" />
                <span className="hidden sm:inline">Home</span>
              </Link>
              {subjects.map((subject, index) => {
                const Icon = iconMap[subject.name] ?? BookOpen;
                return (
                  <Link
                    key={subject.id}
                    href={`/subjects/${subject.id}`}
                    onClick={() => handleSubjectClick(subject.id)}
                    className={getResponsiveClasses(index)}
                  >
                    <Icon width="16" height="16" />
                    <span>{subject.name === 'Applied Chemistry' ? 'Chem' : subject.name === 'Eng. Graphics' ? 'Graphics' : subject.name.replace('Applied ', '').replace('Communication ', '')}</span>
                  </Link>
                );
              })}
            </div>
        </div>
        <div className="w-[188px] hidden md:block"></div>
      </nav>
    </header>
  );
}
