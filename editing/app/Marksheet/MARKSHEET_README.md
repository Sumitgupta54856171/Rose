# Marksheet React Component

A modern React component that converts the EJS Marksheet template into a fully functional Next.js component with download and print capabilities.

## Features

✅ **Responsive Design** - Works seamlessly on mobile, tablet, and desktop  
✅ **Download PDF** - Export marksheet as PDF with one click  
✅ **Print Ready** - Print-optimized layout  
✅ **Automatic Calculations** - Grade calculation based on marks  
✅ **Clean UI** - Professional marksheet layout with borders and proper formatting  
✅ **TypeScript Support** - Fully typed component with proper interfaces  

## Installation

The component uses `html2canvas` and `jspdf` which are already included in the project. If you need to install them:

```bash
npm install html2canvas jspdf
```

## Usage

### Basic Usage

```tsx
import MarksheetComponent from '@/app/Marksheet/MarksheetComponent';

const MyPage = () => {
  const studentData = {
    roll_number: '001',
    scholar_no: 'SCH2025001',
    student_name: 'John Doe',
    father_name: 'Mr. James Doe',
    mother_name: 'Mrs. Jane Doe',
    dob: '15-06-2010',
    dob_in_words: 'Fifteenth June Two Thousand Ten',
    class: '10',
    section: 'A',
    caste: 'General',
    samagra_id: 'MP123456789',
    aadhar_number: '1234567890123456',
    appar_id: 'AP123456',
    class_teacher_remark: 'Excellent performance',
    scholastic_marks: {
      'English': { half_yearly: 35, annual: 55 },
      'Mathematics': { half_yearly: 39, annual: 59 },
      // ... more subjects
    },
    co_scholastic_grades: {
      literary_skills: 'A+',
      scientific_skills: 'A+',
      // ... more grades
    },
  };

  return <MarksheetComponent student={studentData} />;
};
```

### Integrating with API

```tsx
'use client'
import { useState, useEffect } from 'react';
import MarksheetComponent from '@/app/Marksheet/MarksheetComponent';

export default function MarksheetPage({ params }) {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch student data from API
    fetch(`/api/students/${params.id}`)
      .then(res => res.json())
      .then(data => {
        setStudent(data);
        setLoading(false);
      });
  }, [params.id]);

  if (loading) return <div>Loading...</div>;
  if (!student) return <div>Student not found</div>;

  return <MarksheetComponent student={student} />;
}
```

## Component Props

### `student: StudentData`

The student data object with the following structure:

```typescript
interface StudentData {
  roll_number?: string;
  scholar_no?: string;
  student_name?: string;
  father_name?: string;
  mother_name?: string;
  dob?: string;
  dob_in_words?: string;
  class?: string;
  section?: string;
  caste?: string;
  samagra_id?: string;
  aadhar_number?: string;
  appar_id?: string;
  class_teacher_remark?: string;
  
  // Scholastic marks by subject
  scholastic_marks?: {
    [subjectName: string]: {
      half_yearly?: number;
      annual?: number;
    }
  };
  
  // Co-scholastic grades
  co_scholastic_grades?: {
    literary_skills?: string;
    scientific_skills?: string;
    cultural_skills?: string;
    creativity?: string;
    sports?: string;
    regularity?: string;
    punctuality?: string;
    cleanliness?: string;
    discipline?: string;
    co_operation?: string;
    environmental_consciousness?: string;
    leadership_qualities?: string;
    truthfulness?: string;
    honesty?: string;
    expressive?: string;
  };
}
```

## Features Explained

### Grade Calculation

Grades are automatically calculated based on marks:
- **A+**: 91% and above
- **A**: 81-90%
- **B+**: 71-80%
- **B**: 61-70%
- **C+**: 51-60%
- **C**: 41-50%
- **D**: 33-40%
- **E**: Below 33% (Fail)

### Result Determination

- **Pass**: >= 33%
- **Fail**: < 33%
- Status shows "Promoted" for pass and "Detained" for fail

### PDF Download

Click the "📥 Download PDF" button to download the marksheet as a PDF file with the naming convention: `Marksheet_[StudentName].pdf`

### Print Function

Click the "🖨️ Print" button to open the browser's print dialog for printing the marksheet.

## Styling

The component uses Tailwind CSS for responsive design. The layout is fully responsive:

- **Mobile**: Single column tables with smaller fonts
- **Tablet**: Optimized spacing and layout
- **Desktop**: Full-featured layout with all details

## Files

- `MarksheetComponent.tsx` - Main component
- `MarksheetDemo.tsx` - Example usage with sample data
- This README.md file

## Demo

See `MarksheetDemo.tsx` for a complete working example with sample student data.

## Notes

- The component is client-side ('use client') and requires a modern browser
- Images are served from `/image/` directory (e.g., school logo)
- PDF generation uses html2canvas for rendering and jsPDF for PDF creation
- The print function opens a new window with optimized print styles
