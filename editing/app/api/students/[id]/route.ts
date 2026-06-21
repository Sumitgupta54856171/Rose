import { NextRequest, NextResponse } from 'next/server';

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
  scholastic_marks?: { [key: string]: { half_yearly?: number; annual?: number } };
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

// Sample student data - replace with actual database query
const studentDatabase: Record<string, StudentData> = {
  '1': {
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
    class_teacher_remark: 'Excellent performance and discipline',
    scholastic_marks: {
      'English': { half_yearly: 35, annual: 55 },
      'Hindi': { half_yearly: 38, annual: 58 },
      'Mathematics': { half_yearly: 39, annual: 59 },
      'Science': { half_yearly: 37, annual: 57 },
      'Social Studies': { half_yearly: 36, annual: 56 },
    },
    co_scholastic_grades: {
      literary_skills: 'A+',
      scientific_skills: 'A+',
      cultural_skills: 'A',
      creativity: 'A+',
      sports: 'B+',
      regularity: 'A+',
      punctuality: 'A+',
      cleanliness: 'A',
      discipline: 'A+',
      co_operation: 'A+',
      environmental_consciousness: 'A',
      leadership_qualities: 'A+',
      truthfulness: 'A+',
      honesty: 'A+',
      expressive: 'A',
    },
  },
  '2': {
    roll_number: '002',
    scholar_no: 'SCH2025002',
    student_name: 'Jane Smith',
    father_name: 'Mr. Robert Smith',
    mother_name: 'Mrs. Sarah Smith',
    dob: '20-07-2010',
    dob_in_words: 'Twentieth July Two Thousand Ten',
    class: '10',
    section: 'B',
    caste: 'OBC',
    samagra_id: 'MP987654321',
    aadhar_number: '9876543210987654',
    appar_id: 'AP654321',
    class_teacher_remark: 'Good performance, needs improvement in Mathematics',
    scholastic_marks: {
      'English': { half_yearly: 37, annual: 57 },
      'Hindi': { half_yearly: 36, annual: 56 },
      'Mathematics': { half_yearly: 32, annual: 52 },
      'Science': { half_yearly: 38, annual: 58 },
      'Social Studies': { half_yearly: 37, annual: 57 },
    },
    co_scholastic_grades: {
      literary_skills: 'A',
      scientific_skills: 'A+',
      cultural_skills: 'A+',
      creativity: 'A',
      sports: 'A',
      regularity: 'A+',
      punctuality: 'A',
      cleanliness: 'A+',
      discipline: 'A',
      co_operation: 'A+',
      environmental_consciousness: 'A+',
      leadership_qualities: 'A',
      truthfulness: 'A+',
      honesty: 'A+',
      expressive: 'A',
    },
  },
};

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const studentId = params.id;

    // Check if student exists in database
    if (studentId in studentDatabase) {
      return NextResponse.json(studentDatabase[studentId]);
    }

    // Try to fetch from backend MongoDB if not in sample data
    // Replace this URL with your actual backend URL
    const backendUrl = process.env.BACKEND_URL || 'http://localhost:5000';
    
    try {
      const response = await fetch(`${backendUrl}/api/students/${studentId}`);
      if (response.ok) {
        const data = await response.json();
        return NextResponse.json(data);
      }
    } catch (backendError) {
      console.error('Backend fetch error:', backendError);
    }

    // If not found, return 404
    return NextResponse.json(
      { error: 'Student not found' },
      { status: 404 }
    );
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch student data' },
      { status: 500 }
    );
  }
}
