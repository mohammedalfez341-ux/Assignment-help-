
import type { Subject } from '@/lib/data';

const mockSubjects: Subject[] = [
  {
    id: 'math',
    name: 'Applied Mathematics',
    iconName: 'Calculator',
    assignments: [
      {
        id: 'math-1',
        title: 'Trigonometry',
        pdfUrl: 'https://www.antilles.vi/cms/lib/VI01910243/Centricity/domain/157/gocr_pdfs/bio_0_0_2.pdf',
        webpageUrl: '/assignments/math/trigonometry-quiz',
        pdfTextContent: 'Trigonometry formulas and problems set.',
        isPremium: false,
      },
      {
        id: 'math-2',
        title: 'Calculus Basics',
        pdfUrl: 'https://www.adobe.com/support/products/enterprise/knowledgecenter/media/c4611_sample_explain.pdf',
        pdfTextContent: 'Introduction to derivatives and integrals.',
        isPremium: true,
      }
    ],
  },
  {
    id: 'physics',
    name: 'Applied Physics',
    iconName: 'Beaker',
    assignments: [
      {
        id: 'phys-1',
        title: 'Mechanics',
        pdfUrl: 'https://www.ucd.ie/msc/t4media/T4Tutorials/documents/dummy.pdf',
        pdfTextContent: 'Laws of motion and force analysis.',
        isPremium: false,
      },
      {
        id: 'phys-2',
        title: 'Optics (Solved)',
        pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
        pdfTextContent: 'Study of light and reflection.',
        isPremium: true,
      }
    ],
  },
  {
    id: 'chemistry',
    name: 'Applied Chemistry',
    iconName: 'FlaskConical',
    assignments: [
      {
        id: 'chem-1',
        title: 'Periodic Table',
        pdfUrl: 'https://www.antilles.vi/cms/lib/VI01910243/Centricity/domain/157/gocr_pdfs/bio_0_0_2.pdf',
        pdfTextContent: 'Trends in the periodic table.',
        isPremium: false,
      },
      {
        id: 'chem-2',
        title: 'Chemical Bonding',
        pdfUrl: 'https://www.adobe.com/support/products/enterprise/knowledgecenter/media/c4611_sample_explain.pdf',
        pdfTextContent: 'Covalent and Ionic bonds.',
        isPremium: true,
      }
    ],
  },
  {
    id: 'english',
    name: 'Communication English',
    iconName: 'MessageSquare',
    assignments: [
      {
        id: 'eng-1',
        title: 'Grammar Basics',
        pdfUrl: 'https://www.ucd.ie/msc/t4media/T4Tutorials/documents/dummy.pdf',
        pdfTextContent: 'English grammar rules.',
        isPremium: false,
      }
    ],
  },
  {
    id: 'graphics',
    name: 'Eng. Graphics',
    iconName: 'PencilRuler',
    assignments: [
      {
        id: 'graph-1',
        title: 'Projections (Exam Prep)',
        pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
        pdfTextContent: 'Introduction to engineering drawing.',
        isPremium: true,
      }
    ],
  }
];

export async function getSubjects(): Promise<Subject[]> {
  return mockSubjects;
}
