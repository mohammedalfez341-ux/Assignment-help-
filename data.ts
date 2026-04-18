
export interface Assignment {
  id: string;
  title: string;
  pdfUrl: string;
  pdfTextContent: string;
  webpageUrl?: string;
  isPremium?: boolean;
}

export interface Subject {
  id: string;
  name: string;
  iconName: string;
  assignments: Assignment[];
}
