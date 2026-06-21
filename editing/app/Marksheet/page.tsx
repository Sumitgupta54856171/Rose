'use client'

import { useState, useEffect } from 'react';
import Marksheet from "../Marksheet"

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

export default function Marksheetpage() {
  const [student, setStudent] = useState<StudentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        // Try to fetch from API - replace 1 with dynamic ID as needed
        const response = await fetch('/api/students/1');
        if (!response.ok) {
          throw new Error('Failed to fetch student data');
        }
        const data = await response.json();
        setStudent(data);
      } catch (err) {
        // If API fails, use sample data
        console.log('Using sample student data');
        const sampleStudent: StudentData = {
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
        };
        setStudent(sampleStudent);
      } finally {
        setLoading(false);
      }
    };

    fetchStudent();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-lg font-semibold text-gray-700">Loading marksheet...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-lg font-semibold text-red-600">Error: {error}</div>
      </div>
    );
  }

  return (
    <>
      {student && <Marksheet student={student} />}
    </>
  );
}