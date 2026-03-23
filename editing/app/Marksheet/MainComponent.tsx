import React from 'react';
import Marksheet from './Marksheetui';

const App = () => {
  // Dummy Student Data
  const student = {
    name: "Ayush Sen",
    rollNo: "606",
    className: "9 - A", // Class 9th example
  };

  // Class 9th Format Data (Test, Half, Annual, Project)
  const class9Marks = [
    { subject: "English", test: 4, halfYearly: 4, annual: 65, project: 18, total: 91, grade: "A+" },
    { subject: "Hindi", test: 5, halfYearly: 3, annual: 60, project: 19, total: 87, grade: "A+" },
    { subject: "Mathematics", test: 5, halfYearly: 4, annual: 68, project: 20, total: 97, grade: "A+" },
    { subject: "Science", test: 4, halfYearly: 4, annual: 58, project: 18, total: 84, grade: "A" },
    { subject: "Social Science", test: 4, halfYearly: 5, annual: 62, project: 19, total: 90, grade: "A+" },
  ];

  /* Agar LKG ho toh data kuch aisa dikhega:
  const lkgMarks = [
    { subject: "English", monthly: 8, halfYearly: 18, annual: 55, project: 9, total: 90, grade: "A+" },
    { subject: "Hindi", monthly: 9, halfYearly: 17, annual: 52, project: 8, total: 86, grade: "A+" },
    { subject: "Mathematics", monthly: 10, halfYearly: 19, annual: 58, project: 10, total: 97, grade: "A+" },
  ]
  */

  return (
    <div>
      <Marksheet 
        studentData={student} 
        classGroup="9"          // 'LKG-UKG', '1-4', '6-8', '9', '11' pass kar sakte hain
        stream=""               // Sirf 11th ke liye 'Math', 'Bio', 'Commerce', 'Art'
        marksData={class9Marks} // Array of objects
      />
    </div>
  );
};

export default App;