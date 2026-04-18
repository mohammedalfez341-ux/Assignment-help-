
import type { Assignment } from '@/lib/data';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link, ExternalLink } from 'lucide-react';

interface PdfViewerProps {
  assignment: Assignment | null;
}

export function PdfViewer({ assignment }: PdfViewerProps) {

  const handleFullScreen = () => {
    if (assignment?.pdfUrl) {
      window.open(assignment.pdfUrl, '_blank');
    }
  };

  return (
    <Card className="h-full w-full flex flex-col shadow-lg">
      <CardHeader className="bg-secondary/40 border-b">
        <CardTitle className="font-headline text-xl flex items-center gap-2 text-card-foreground">
          <Link className="text-primary h-5 w-5" />
          {assignment ? assignment.title : 'Content Preview'}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow p-0">
        {assignment ? (
          <iframe
            src={assignment.pdfUrl}
            className="h-full w-full border-0"
            title={assignment.title}
            sandbox="allow-scripts allow-same-origin"
            aria-label={`${assignment.title} PDF content`}
          />
        ) : (
            <div className="flex items-center justify-center h-full text-muted-foreground">
                <p>Select an assignment to view the PDF.</p>
            </div>
        )}
      </CardContent>
      <CardFooter className="p-3 text-center justify-center border-t bg-secondary/20">
        <Button onClick={handleFullScreen} variant="outline" size="sm" disabled={!assignment?.pdfUrl}>
          <ExternalLink className="mr-1.5" />
          Full Screen
        </Button>
      </CardFooter>
    </Card>
  );
}
