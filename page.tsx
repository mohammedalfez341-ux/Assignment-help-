
import { getSubjects } from '@/lib/services';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, FileText, Globe } from 'lucide-react';
import Link from 'next/link';

// Essential for Static Export: Tells Next.js which paths to pre-render
export async function generateStaticParams() {
  const subjects = await getSubjects();
  return subjects.map((subject) => ({
    subjectId: subject.id,
  }));
}

export default async function SubjectPage({ params }: { params: { subjectId: string } }) {
  const subjects = await getSubjects();
  const subject = subjects.find(s => s.id === params.subjectId);

  if (!subject) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center text-destructive">Subject not found</h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center text-primary font-headline">{subject.name} Assignments</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {subject.assignments.map(assignment => (
          <Card key={assignment.id} className="flex flex-col h-full shadow-lg hover:shadow-xl transition-shadow border-primary/10">
            <CardHeader>
              <CardTitle className="text-xl mb-1 font-headline">{assignment.title}</CardTitle>
              <div className="text-sm text-muted-foreground flex items-center">
                <Calendar className="mr-1.5 h-4 w-4" />
                Updated: Aug 17, 2025
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-sm text-muted-foreground line-clamp-3">{assignment.pdfTextContent}</p>
            </CardContent>
            <CardFooter className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 pt-4 border-t">
              <Button asChild variant="outline" className="w-full sm:w-auto flex-1 sm:flex-none">
                <Link href={`/?currentAssignmentSlotId=${assignment.id}`}>
                  <FileText className="mr-2 h-4 w-4 text-primary" />
                  View PDF
                </Link>
              </Button>
              {assignment.webpageUrl && (
                 <Button asChild variant="outline" className="w-full sm:w-auto flex-1 sm:flex-none">
                    <Link href={assignment.webpageUrl}>
                      <Globe className="mr-2 h-4 w-4 text-primary" />
                      Webpage
                    </Link>
                  </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
