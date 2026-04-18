
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { 
    Info, 
    Mail, 
    ChevronRight, 
    FileText, 
    Globe, 
    BookOpenCheck, 
    BrainCircuit, 
    Beaker, 
    FlaskConical, 
    MessageSquare, 
    PencilRuler,
    BookUp,
    Lock
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useDashboardLayout } from '@/contexts/DashboardLayoutContext';
import type { Subject, Assignment } from '@/lib/data';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const iconMap: { [key: string]: React.ElementType } = {
  'Applied Mathematics': BrainCircuit,
  'Applied Physics': Beaker, 
  'Applied Chemistry': FlaskConical, 
  'Communication English': MessageSquare,
  'Eng. Graphics': PencilRuler,
};

const SubjectIcon = ({ subjectName }: { subjectName: string }) => {
    const Icon = iconMap[subjectName] || BookUp;
    return <Icon className="h-5 w-5 text-primary" />;
};

export function ClientSidebar() {
  const { 
    isSubjectBarVisible, 
    subjects, 
    setCurrentSubjectId, 
    setCurrentAssignmentSlotId, 
    setSelectedContentType 
  } = useDashboardLayout();

  const handlePdfView = (subjectId: string, assignment: Assignment) => {
    if (assignment.isPremium) {
        // In a real app, this would trigger a payment modal or login
        alert("This is a Premium Assignment. Please purchase a subscription to view.");
        return;
    }
    setCurrentSubjectId(subjectId);
    setCurrentAssignmentSlotId(assignment.id);
    setSelectedContentType('pdf');
  }

  const InfoIcon = () => (<Info className="h-5 w-5 text-primary" />);
  const MailIcon = () => (<Mail className="h-5 w-5 text-primary" />);

  return (
    <Card className={cn(
      "border-r-0 md:border-r rounded-none md:rounded-l-lg md:rounded-r-none shadow-none md:shadow-sm flex-shrink-0 flex flex-col h-full w-full",
      "transition-all duration-300 ease-in-out",
      !isSubjectBarVisible && "w-0 p-0 border-transparent opacity-0" 
    )}>
      {isSubjectBarVisible && (
        <>
          <CardHeader className="p-4 border-b flex-shrink-0">
            <CardTitle className="text-lg flex items-center gap-2">
                <BookOpenCheck className="h-5 w-5 text-primary" />
                Subjects
            </CardTitle>
          </CardHeader>
          <ScrollArea className="flex-grow">
            <CardContent className="p-2">
                <Accordion type="single" collapsible className="w-full space-y-1">
                    {subjects.map((subject) => (
                        <AccordionItem value={subject.id} key={subject.id} className="border-none">
                            <AccordionTrigger className="hover:no-underline hover:bg-accent/10 px-3 py-2 rounded-md transition-colors text-left">
                                <div className="flex items-center gap-3">
                                    <SubjectIcon subjectName={subject.name} />
                                    <span className="font-medium truncate">{subject.name}</span>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="pt-2 pl-4 space-y-2">
                                {subject.assignments.map((assignment) => (
                                    <div key={assignment.id} className={cn(
                                        "p-2 border rounded-md shadow-sm space-y-2 relative transition-all",
                                        assignment.isPremium ? "bg-muted/50 border-accent/20" : "bg-background border-border"
                                    )}>
                                        <div className="flex items-center justify-between gap-2">
                                            <p className="text-sm font-medium truncate flex-1">{assignment.title}</p>
                                            {assignment.isPremium && <Lock className="h-3 w-3 text-accent shrink-0" />}
                                        </div>
                                        <div className="flex gap-2">
                                            <Button 
                                                variant={assignment.isPremium ? "secondary" : "outline"}
                                                size="sm" 
                                                className="h-8 flex-1 text-xs" 
                                                onClick={() => handlePdfView(subject.id, assignment)}
                                            >
                                                {assignment.isPremium ? <Lock className="h-3 w-3 mr-1" /> : <FileText className="h-3 w-3 mr-1" />}
                                                {assignment.isPremium ? "Unlock" : "PDF"}
                                            </Button>
                                            <Button 
                                                asChild 
                                                variant="outline" 
                                                size="sm" 
                                                className="h-8 flex-1 text-xs"
                                                disabled={!assignment.webpageUrl || assignment.isPremium}
                                            >
                                                <Link href={assignment.isPremium ? "#" : (assignment.webpageUrl || '#')}>
                                                    <Globe className="h-3 w-3 mr-1" />
                                                    Web
                                                </Link>
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                                {subject.assignments.length === 0 && (
                                    <p className="text-xs text-muted-foreground italic">No assignments yet.</p>
                                )}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
                
                <Separator className="my-3" />
                
                <div className="space-y-1">
                    <Button
                        variant="ghost"
                        className="w-full justify-start text-left h-10 px-3 py-2 rounded-md hover:bg-accent/10 transition-colors"
                        asChild
                    >
                        <Link href="/about-us" className="flex items-center gap-3 w-full">
                            <InfoIcon />
                            <span className="flex-grow font-medium truncate">About Us</span>
                            <ChevronRight size={16} className="text-muted-foreground ml-auto" />
                        </Link>
                    </Button>
                    <Button
                        variant="ghost"
                        className="w-full justify-start text-left h-10 px-3 py-2 rounded-md hover:bg-accent/10 transition-colors"
                        asChild
                    >
                        <Link href="/contact-us" className="flex items-center gap-3 w-full">
                            <MailIcon />
                            <span className="flex-grow font-medium truncate">Contact Us</span>
                            <ChevronRight size={16} className="text-muted-foreground ml-auto" />
                        </Link>
                    </Button>
                </div>
            </CardContent>
          </ScrollArea>
        </>
      )}
    </Card>
  );
}
