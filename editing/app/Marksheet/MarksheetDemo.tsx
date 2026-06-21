'use client'
import MarksheetComponent from './MarksheetComponent';

export default function MarksheetDemo() {
  // Sample student data - replace this with actual data from your API
  const sampleStudent = {
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

  return (
    <div>
      <MarksheetComponent student={sampleStudent} />
    </div>
  );
}
