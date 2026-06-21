'use client'
import React, { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

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

interface MarksheetComponentProps {
  student: StudentData;
}

export default function MarksheetComponent({ student }: MarksheetComponentProps) {
  const marksheetRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const getGrade = (obtained: number | undefined, max: number): string => {
    if (obtained === null || obtained === undefined) return '-';
    const perc = (obtained / max) * 100;
    if (perc >= 91) return 'A+';
    if (perc >= 81) return 'A';
    if (perc >= 71) return 'B+';
    if (perc >= 61) return 'B';
    if (perc >= 51) return 'C+';
    if (perc >= 41) return 'C';
    if (perc >= 33) return 'D';
    return 'E';
  };

  let totalHalfMax = 0,
    totalHalfObt = 0;
  let totalAnnMax = 0,
    totalAnnObt = 0;
  let totalFinalMax = 0,
    totalFinalObt = 0;

  const subjects = student.scholastic_marks || {};
  const subjectNames = Object.keys(subjects);

  subjectNames.forEach((sub) => {
    const halfMax = 40;
    const halfObt = subjects[sub]?.half_yearly || 0;
    const annMax = 60;
    const annObt = subjects[sub]?.annual || 0;
    const finalMax = halfMax + annMax;
    const finalObt = halfObt + annObt;

    totalHalfMax += halfMax;
    totalHalfObt += halfObt;
    totalAnnMax += annMax;
    totalAnnObt += annObt;
    totalFinalMax += finalMax;
    totalFinalObt += finalObt;
  });

  const finalPercentage =
    totalFinalMax > 0 ? ((totalFinalObt / totalFinalMax) * 100).toFixed(2) : '0';
  const isPass = parseFloat(finalPercentage) >= 33;
  const resultText = isPass ? 'PASS' : 'FAIL';
  const resultClass = isPass ? 'text-green-600 font-bold' : 'text-red-600 font-bold';
  const finalGrade = getGrade(totalFinalObt, totalFinalMax);
  const promotedText = isPass ? 'Promoted' : 'Detained';

  const co = student.co_scholastic_grades || {};

  const handleDownload = async () => {
    if (!marksheetRef.current) return;

    setIsDownloading(true);
    try {
      const element = marksheetRef.current;
      const canvas = await html2canvas(element, {
        scale: 2,
        logging: false,
        useCORS: true,
        backgroundColor: '#ffffff',
      });

      const imgWidth = 210; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const pdf = new jsPDF('p', 'mm', 'a4');

      let position = 0;
      const pageHeight = 297; // A4 height in mm

      const imgData = canvas.toDataURL('image/jpeg', 0.98);

      if (imgHeight <= pageHeight) {
        pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
      } else {
        let remainingHeight = imgHeight;
        while (remainingHeight > 0) {
          const pageContent = canvas.height * (pageHeight / imgHeight);
          const cropped = document.createElement('canvas');
          cropped.width = canvas.width;
          cropped.height = pageContent;
          const ctx = cropped.getContext('2d');
          if (ctx) {
            ctx.drawImage(
              canvas,
              0,
              imgHeight - remainingHeight - pageContent,
              canvas.width,
              pageContent
            );
            const croppedImg = cropped.toDataURL('image/jpeg', 0.98);
            pdf.addImage(croppedImg, 'JPEG', 0, 0, imgWidth, pageHeight);
          }
          remainingHeight -= pageHeight;
          if (remainingHeight > 0) {
            pdf.addPage();
          }
        }
      }

      pdf.save(`Marksheet_${student.student_name || 'Student'}.pdf`);
    } catch (error) {
      console.error('Download error:', error);
      alert('Error downloading PDF');
    } finally {
      setIsDownloading(false);
    }
  };

  const handlePrint = () => {
    if (!marksheetRef.current) return;

    const printWindow = window.open('', '', 'width=900,height=1000');
    if (printWindow) {
      printWindow.document.write(marksheetRef.current.innerHTML);
      printWindow.document.close();
      printWindow.print();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 md:p-8">
      {/* Marksheet Container */}
      <div
        ref={marksheetRef}
        className="w-full max-w-4xl bg-white border-4 border-blue-900 shadow-lg p-6 md:p-8"
        style={{ width: '900px', maxWidth: '100%' }}
      >
        {/* Inner Border */}
        <div className="border border-blue-900 p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-4 text-blue-900 relative">
            <img
              src="/image/LOGO.jpg.jpeg"
              alt="Rose Convent High School Logo"
              className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover"
              style={{
                boxShadow:
                  '0 0 0 2px #C8972A, 0 0 0 4px rgba(200,151,42,0.3)',
              }}
            />

            <div className="flex-1 text-center px-4">
              <div
                className="font-black text-2xl md:text-3xl mb-1 text-blue-900"
                style={{ letterSpacing: '0.5px', textTransform: 'uppercase' }}
              >
                Rose Convent High School
              </div>
              <div className="font-bold text-sm md:text-base text-blue-900">
                DILAURA, SATNA (M.P.)
              </div>
            </div>

            <div className="text-xs md:text-sm font-bold text-gray-800 absolute bottom-0 right-0">
              Dise Code : 23130731404
            </div>
          </div>

          {/* Session Banner */}
          <div className="bg-blue-100 text-blue-900 text-center font-bold py-2 px-4 border-t-2 border-b-2 border-blue-900 mb-4 text-sm md:text-base">
            STUDENT PROGRESS CARD (SESSION : 2025-26)
          </div>

          {/* Student Info Table */}
          <div className="overflow-x-auto mb-4">
            <table className="w-full border-collapse border border-gray-800 text-xs md:text-sm">
              <tbody>
                <tr>
                  <th className="border border-gray-800 bg-gray-100 font-bold p-2 text-left w-1/4">
                    Roll Number
                  </th>
                  <td className="border border-gray-800 p-2 w-1/5">
                    {student.roll_number || 'N/A'}
                  </td>
                  <th className="border border-gray-800 bg-gray-100 font-bold p-2 text-left w-1/4">
                    Scholar Number
                  </th>
                  <td colSpan={2} className="border border-gray-800 p-2">
                    {student.scholar_no || 'N/A'}
                  </td>
                  <td rowSpan={7} className="border border-gray-800 p-1 w-1/5 align-top">
                    <div className="border border-gray-600 bg-gray-50 flex items-center justify-center h-24 text-gray-400">
                      PHOTO
                    </div>
                  </td>
                </tr>
                <tr>
                  <th className="border border-gray-800 bg-gray-100 font-bold p-2 text-left">
                    Name of Student
                  </th>
                  <td colSpan={4} className="border border-gray-800 p-2 font-bold">
                    {student.student_name || 'N/A'}
                  </td>
                </tr>
                <tr>
                  <th className="border border-gray-800 bg-gray-100 font-bold p-2 text-left">
                    Father's Name
                  </th>
                  <td colSpan={4} className="border border-gray-800 p-2">
                    {student.father_name || 'N/A'}
                  </td>
                </tr>
                <tr>
                  <th className="border border-gray-800 bg-gray-100 font-bold p-2 text-left">
                    Mother's Name
                  </th>
                  <td colSpan={4} className="border border-gray-800 p-2">
                    {student.mother_name || 'N/A'}
                  </td>
                </tr>
                <tr>
                  <th className="border border-gray-800 bg-gray-100 font-bold p-2 text-left">
                    Date of Birth
                  </th>
                  <td className="border border-gray-800 p-2">{student.dob || 'N/A'}</td>
                  <th className="border border-gray-800 bg-gray-100 font-bold p-2 text-left">
                    in words
                  </th>
                  <td colSpan={2} className="border border-gray-800 p-2">
                    {student.dob_in_words || 'N/A'}
                  </td>
                </tr>
                <tr>
                  <th className="border border-gray-800 bg-gray-100 font-bold p-2 text-left">
                    Class
                  </th>
                  <td className="border border-gray-800 p-2">{student.class || 'N/A'}</td>
                  <th className="border border-gray-800 bg-gray-100 font-bold p-2 text-left">
                    Section
                  </th>
                  <td colSpan={2} className="border border-gray-800 p-2">
                    Section - {student.section || 'A'}
                  </td>
                </tr>
                <tr>
                  <th className="border border-gray-800 bg-gray-100 font-bold p-2 text-left">
                    Caste / Category
                  </th>
                  <td className="border border-gray-800 p-2">{student.caste || 'N/A'}</td>
                  <th className="border border-gray-800 bg-gray-100 font-bold p-2 text-left">
                    SSSM ID
                  </th>
                  <td colSpan={2} className="border border-gray-800 p-2">
                    {student.samagra_id || 'N/A'}
                  </td>
                </tr>
                <tr>
                  <th className="border border-gray-800 bg-gray-100 font-bold p-2 text-left">
                    Aadhaar Number
                  </th>
                  <td className="border border-gray-800 p-2">
                    {student.aadhar_number || 'N/A'}
                  </td>
                  <th className="border border-gray-800 bg-gray-100 font-bold p-2 text-left">
                    Appar ID
                  </th>
                  <td className="border border-gray-800 p-2">
                    {student.appar_id || 'N/A'}
                  </td>
                  <th className="border border-gray-800 bg-gray-100 font-bold p-2 text-left w-20">
                    Medium
                  </th>
                  <td className="border border-gray-800 p-2 font-bold">ENGLISH</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Student Performance Section */}
          <div className="flex items-baseline gap-2 mb-3 text-blue-900">
            <div className="font-bold text-sm md:text-base">Student's Performance</div>
            <span className="text-xs font-normal text-red-600">
              (As per order of M.P. Govt.)
            </span>
          </div>

          {/* Marks Table */}
          <div className="overflow-x-auto mb-4">
            <table className="w-full border-collapse border border-gray-800 text-xs">
              <thead>
                <tr className="bg-blue-100 text-center text-blue-900 font-bold">
                  <th rowSpan={2} className="border border-gray-800 p-2">
                    Subjects
                  </th>
                  <th colSpan={3} className="border border-gray-800 p-2">
                    Half Yearly Evaluation
                  </th>
                  <th colSpan={3} className="border border-gray-800 p-2">
                    Annual Evaluation
                  </th>
                  <th colSpan={3} className="border border-gray-800 p-2">
                    Final Assessment
                  </th>
                </tr>
                <tr className="bg-blue-100 text-center text-blue-900 font-bold">
                  <th className="border border-gray-800 p-1">Max.</th>
                  <th className="border border-gray-800 p-1">Obt.</th>
                  <th className="border border-gray-800 p-1">Grade</th>
                  <th className="border border-gray-800 p-1">Max.</th>
                  <th className="border border-gray-800 p-1">Obt.</th>
                  <th className="border border-gray-800 p-1">Grade</th>
                  <th className="border border-gray-800 p-1">Max.</th>
                  <th className="border border-gray-800 p-1">Obt.</th>
                  <th className="border border-gray-800 p-1">Grade</th>
                </tr>
              </thead>
              <tbody>
                {subjectNames.map((sub) => {
                  const halfMax = 40;
                  const halfObt = subjects[sub]?.half_yearly || 0;
                  const annMax = 60;
                  const annObt = subjects[sub]?.annual || 0;
                  const finalMax = halfMax + annMax;
                  const finalObt = halfObt + annObt;

                  return (
                    <tr key={sub} className="text-center">
                      <td className="border border-gray-800 p-2 text-left font-bold">
                        {sub}
                      </td>
                      <td className="border border-gray-800 p-1">{halfMax}</td>
                      <td className="border border-gray-800 p-1">{halfObt}</td>
                      <td className="border border-gray-800 p-1">
                        {getGrade(halfObt, halfMax)}
                      </td>
                      <td className="border border-gray-800 p-1">{annMax}</td>
                      <td className="border border-gray-800 p-1">{annObt}</td>
                      <td className="border border-gray-800 p-1">
                        {getGrade(annObt, annMax)}
                      </td>
                      <td className="border border-gray-800 p-1">{finalMax}</td>
                      <td className="border border-gray-800 p-1">{finalObt}</td>
                      <td className="border border-gray-800 p-1">
                        {getGrade(finalObt, finalMax)}
                      </td>
                    </tr>
                  );
                })}

                <tr className="font-bold text-center">
                  <td className="border border-gray-800 p-2 text-left">Total</td>
                  <td className="border border-gray-800 p-1">{totalHalfMax}</td>
                  <td className="border border-gray-800 p-1">{totalHalfObt}</td>
                  <td className="border border-gray-800 p-1">
                    {getGrade(totalHalfObt, totalHalfMax)}
                  </td>
                  <td className="border border-gray-800 p-1">{totalAnnMax}</td>
                  <td className="border border-gray-800 p-1">{totalAnnObt}</td>
                  <td className="border border-gray-800 p-1">
                    {getGrade(totalAnnObt, totalAnnMax)}
                  </td>
                  <td className="border border-gray-800 p-1">{totalFinalMax}</td>
                  <td className="border border-gray-800 p-1">{totalFinalObt}</td>
                  <td className="border border-gray-800 p-1">{finalGrade}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Co-Scholastic Performance */}
          <div className="flex items-baseline gap-2 mb-3 text-blue-900">
            <div className="font-bold text-sm md:text-base">Performance in Co-Scholastic Areas :</div>
          </div>

          <div className="overflow-x-auto mb-4">
            <table className="w-full border-collapse border border-gray-800 text-xs md:text-sm">
              <thead>
                <tr className="bg-blue-100">
                  <th colSpan={2} className="border border-gray-800 p-2 text-center font-bold">
                    Co-Curricular Activities
                  </th>
                  <th colSpan={2} className="border border-gray-800 p-2 text-center font-bold">
                    {/* Empty for spacing */}
                  </th>
                  <th colSpan={2} className="border border-gray-800 p-2 text-center font-bold">
                    Social Activities
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-800 p-2 font-bold">LITERARY SKILLS</td>
                  <td className="border border-gray-800 p-2 text-center">
                    {co.literary_skills || '-'}
                  </td>
                  <td className="border border-gray-800 p-2 font-bold">REGULARITY</td>
                  <td className="border border-gray-800 p-2 text-center">
                    {co.regularity || '-'}
                  </td>
                  <td className="border border-gray-800 p-2 font-bold">ENV. CONSCIOUSNESS</td>
                  <td className="border border-gray-800 p-2 text-center">
                    {co.environmental_consciousness || '-'}
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-800 p-2 font-bold">SCIENTIFIC SKILLS</td>
                  <td className="border border-gray-800 p-2 text-center">
                    {co.scientific_skills || '-'}
                  </td>
                  <td className="border border-gray-800 p-2 font-bold">PUNCTUALITY</td>
                  <td className="border border-gray-800 p-2 text-center">
                    {co.punctuality || '-'}
                  </td>
                  <td className="border border-gray-800 p-2 font-bold">LEADERSHIP</td>
                  <td className="border border-gray-800 p-2 text-center">
                    {co.leadership_qualities || '-'}
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-800 p-2 font-bold">CULTURAL SKILLS</td>
                  <td className="border border-gray-800 p-2 text-center">
                    {co.cultural_skills || '-'}
                  </td>
                  <td className="border border-gray-800 p-2 font-bold">CLEANLINESS</td>
                  <td className="border border-gray-800 p-2 text-center">
                    {co.cleanliness || '-'}
                  </td>
                  <td className="border border-gray-800 p-2 font-bold">TRUTHFULNESS</td>
                  <td className="border border-gray-800 p-2 text-center">
                    {co.truthfulness || '-'}
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-800 p-2 font-bold">CREATIVITY</td>
                  <td className="border border-gray-800 p-2 text-center">
                    {co.creativity || '-'}
                  </td>
                  <td className="border border-gray-800 p-2 font-bold">DISCIPLINE</td>
                  <td className="border border-gray-800 p-2 text-center">
                    {co.discipline || '-'}
                  </td>
                  <td className="border border-gray-800 p-2 font-bold">HONESTY</td>
                  <td className="border border-gray-800 p-2 text-center">
                    {co.honesty || '-'}
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-800 p-2 font-bold">SPORTS</td>
                  <td className="border border-gray-800 p-2 text-center">
                    {co.sports || '-'}
                  </td>
                  <td className="border border-gray-800 p-2 font-bold">CO-OPERATION</td>
                  <td className="border border-gray-800 p-2 text-center">
                    {co.co_operation || '-'}
                  </td>
                  <td className="border border-gray-800 p-2 font-bold">EXPRESSIVE</td>
                  <td className="border border-gray-800 p-2 text-center">
                    {co.expressive || '-'}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Final Result */}
          <div className="flex items-baseline gap-2 mb-3 text-blue-900">
            <div className="font-bold text-sm md:text-base">Final Result :</div>
          </div>

          <div className="overflow-x-auto mb-6">
            <table className="w-full border-collapse border border-gray-800 text-xs md:text-sm">
              <thead>
                <tr className="bg-blue-100 text-center text-blue-900 font-bold">
                  <th className="border border-gray-800 p-2">Max. Marks</th>
                  <th className="border border-gray-800 p-2">Obt. Marks</th>
                  <th className="border border-gray-800 p-2">Result</th>
                  <th className="border border-gray-800 p-2">Percentage</th>
                  <th className="border border-gray-800 p-2">Grade</th>
                </tr>
              </thead>
              <tbody>
                <tr className="text-center font-bold">
                  <td className="border border-gray-800 p-2">{totalFinalMax}</td>
                  <td className="border border-gray-800 p-2">{totalFinalObt}</td>
                  <td className={`border border-gray-800 p-2 ${resultClass}`}>
                    {resultText}
                  </td>
                  <td className="border border-gray-800 p-2">{finalPercentage}%</td>
                  <td className="border border-gray-800 p-2">{finalGrade}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Footer Remarks */}
          <div className="flex justify-between mb-12 text-xs md:text-sm font-bold px-3">
            <div>
              Class Teacher Remark :{' '}
              <span className="font-normal">{student.class_teacher_remark || 'Good'}</span>
            </div>
            <div>
              Status : <span className="font-normal">{promotedText}</span>
            </div>
          </div>

          {/* Signatures */}
          <div className="flex justify-between px-6">
            <div className="text-center text-xs md:text-sm font-bold text-gray-800">
              <div
                className="w-32 border-t border-gray-800 mb-2"
                style={{ height: '50px' }}
              ></div>
              Class Teacher
            </div>
            <div className="text-center text-xs md:text-sm font-bold text-blue-900">
              <div
                className="w-32 border-t border-blue-900 mb-2"
                style={{ height: '50px' }}
              ></div>
              Principal
              <div className="text-xs font-normal mt-1">
                Rose Convent High School
                <br />
                Head of School
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 mt-8 flex-wrap justify-center">
        <button
          onClick={handleDownload}
          disabled={isDownloading}
          className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400 text-sm md:text-base"
        >
          {isDownloading ? (
            <>
              <span className="animate-spin">⏳</span>
              Downloading...
            </>
          ) : (
            <>
              📥 Download PDF
            </>
          )}
        </button>

        <button
          onClick={handlePrint}
          className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition text-sm md:text-base"
        >
          🖨️ Print
        </button>
      </div>
    </div>
  );
}
