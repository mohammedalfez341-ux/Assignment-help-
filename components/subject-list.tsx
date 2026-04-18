
'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import type { LucideIcon } from 'lucide-react';
import type { Assignment, Subject } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { BookOpen, BookOpenCheck, Calculator, Code, FlaskConical, ScrollText } from 'lucide-react';

interface SubjectListProps {
  subjects: Subject[];
}

export const iconMap: Record<string, LucideIcon> = {
  Calculator,
  ScrollText,
  FlaskConical,
  BookOpen,
  Code,
};

export function SubjectList({ subjects }: SubjectListProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const selectedAssignmentId = searchParams.get('id');
  const selectedSubjectIdFromUrl = searchParams.get('subject');

  const handleSelectAssignment = (assignment: Assignment) => {
    const params = new URLSearchParams(searchParams);
    params.set('id', assignment.id);
    if(selectedSubjectIdFromUrl) params.delete('subject');
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleSubjectClick = (subject: Subject) => {
    const params = new URLSearchParams(searchParams.toString());
    if (subject.assignments.length > 0) {
      const currentAssignmentForSubject = subject.assignments.find(a => a.id === selectedAssignmentId);
      if(!currentAssignmentForSubject) {
        params.set('id', subject.assignments[0].id);
      }
    } else {
      params.delete('id');
    }
    params.set('subject', subject.id);
    router.push(`${pathname}?${params.toString()}`);
  };

  const getOpenSubjectId = () => {
    if (selectedSubjectIdFromUrl) return selectedSubjectIdFromUrl;
    const subject = subjects.find(s => s.assignments.some(a => a.id === selectedAssignmentId));
    return subject?.id;
  }

  const openSubjectId = getOpenSubjectId();

  return (
    <Card className="flex-grow rounded-none shadow-none border-0 border-r">
      <CardHeader>
        <CardTitle className="font-headline text-lg">
          Subjects
        </CardTitle>
      </CardHeader>
      <CardContent className="p-2">
        <Accordion type="single" collapsible defaultValue={openSubjectId} key={openSubjectId} className="w-full">
          {subjects.map((subject) => {
            const Icon = iconMap[subject.iconName] ?? BookOpen;
            return (
                <AccordionItem value={subject.id} key={subject.id} className="border-b-0">
                    <AccordionTrigger 
                        className="px-4 py-2 font-semibold text-sm text-muted-foreground hover:no-underline hover:bg-accent hover:text-accent-foreground rounded-md transition-colors"
                        onClick={() => handleSubjectClick(subject)}
                    >
                        <div className="flex items-center gap-3">
                            <Icon className="h-4 w-4" />
                            {subject.name}
                        </div>
                    </AccordionTrigger>
                    <AccordionContent>
                        <div className="flex flex-col items-start space-y-1 pt-2 pl-4">
                        {subject.assignments.length > 0 ? (
                            subject.assignments.map((assignment) => (
                                <Button
                                key={assignment.id}
                                variant={selectedAssignmentId === assignment.id ? 'secondary' : 'ghost'}
                                className="w-full justify-start whitespace-normal text-left h-auto py-2 px-3 font-normal"
                                onClick={() => handleSelectAssignment(assignment)}
                                >
                                {assignment.title}
                                </Button>
                            ))
                        ) : (
                            <p className="px-2 py-1 text-sm text-muted-foreground">No assignments.</p>
                        )}
                        </div>
                    </AccordionContent>
                </AccordionItem>
            );
          })}
        </Accordion>
      </CardContent>
    </Card>
  );
}
