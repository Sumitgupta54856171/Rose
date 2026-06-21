# Integration Guide - Using MarksheetComponent

## Option 1: Replace the current page.tsx

Update your `editing/app/Marksheet/page.tsx` to use the new component:

```tsx
'use client'
import { useState, useEffect } from 'react';
import MarksheetComponent from './MarksheetComponent';

export default function MarksheetPage({ searchParams }) {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        // Get student ID from query params or route params
        const studentId = searchParams?.id || 'default';
        
        // Fetch from your API
        const response = await fetch(`/api/students/${studentId}`);
        if (!response.ok) throw new Error('Student not found');
        
        const data = await response.json();
        setStudent(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error loading student');
      } finally {
        setLoading(false);
      }
    };

    fetchStudent();
  }, [searchParams?.id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg font-semibold">Loading marksheet...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg font-semibold text-red-600">Error: {error}</div>
      </div>
    );
  }

  if (!student) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg font-semibold">No student data available</div>
      </div>
    );
  }

  return <MarksheetComponent student={student} />;
}
```

## Option 2: Keep existing components and add MarksheetComponent

If you want to keep MainComponent and MarksheetManager, add the MarksheetComponent to your page:

```tsx
import App from "./MainComponent"
import MarksheetManager from "./lkg/Marksheet1"
import MarksheetComponent from "./MarksheetComponent"

export default function Marksheetpage(){
  const sampleStudent = {
    // ... student data
  }

  return <>
    <App></App>
    <MarksheetManager/>
    <MarksheetComponent student={sampleStudent} />
  </>
}
```

## API Endpoint Example

Create an API route to fetch student data:

**File: `editing/app/api/students/[id]/route.ts`**

```typescript
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Fetch from your backend database
    const response = await fetch(`http://localhost:5000/api/students/${params.id}`);
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch student' },
      { status: 500 }
    );
  }
}
```

## Using with Next.js Link

Navigate to the marksheet component:

```tsx
import Link from 'next/link';

export default function StudentList() {
  return (
    <>
      {students.map(student => (
        <Link 
          key={student.id}
          href={`/Marksheet?id=${student.id}`}
        >
          View Marksheet
        </Link>
      ))}
    </>
  );
}
```

## Direct Static Usage

For static/demo marksheets, use MarksheetDemo.tsx:

```tsx
import MarksheetDemo from '@/app/Marksheet/MarksheetDemo';

export default function Page() {
  return <MarksheetDemo />;
}
```

## Key Features Available

✅ Download as PDF  
✅ Print functionality  
✅ Automatic grade calculation  
✅ Responsive design  
✅ Professional layout  
✅ TypeScript support  

## Troubleshooting

### PDF Download Not Working
- Ensure browser allows file downloads
- Check browser console for errors
- Verify the student data is complete

### Print Shows Blank Page
- Check if content is loaded
- Try the download option instead
- Ensure images are accessible

### Images Not Showing
- Verify `/image/LOGO.jpg.jpeg` exists in public folder
- Check CORS settings if images are external
- Use absolute URLs if needed
