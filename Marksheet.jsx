import React from 'react';

const Marksheet = ({ student }) => {
  // ==========================================
  // AUTOMATIC CALCULATION LOGIC
  // ==========================================
  const getGrade = (obtained, max) => {
    if (obtained === null || obtained === undefined) return "-";
    let perc = (obtained / max) * 100;
    if (perc >= 91) return "A+";
    if (perc >= 81) return "A";
    if (perc >= 71) return "B+";
    if (perc >= 61) return "B";
    if (perc >= 51) return "C+";
    if (perc >= 41) return "C";
    if (perc >= 33) return "D";
    return "E"; // Fail Grade
  };

  let totalHalfMax = 0, totalHalfObt = 0;
  let totalAnnMax = 0, totalAnnObt = 0;
  let totalFinalMax = 0, totalFinalObt = 0;

  const subjects = student.scholastic_marks || {};
  const subjectNames = Object.keys(subjects);

  const subjectRows = subjectNames.map(sub => {
    let halfMax = 40;
    let halfObt = subjects[sub].half_yearly || 0;
    let annMax = 60;
    let annObt = subjects[sub].annual || 0;
    let finalMax = halfMax + annMax;
    let finalObt = halfObt + annObt;

    totalHalfMax += halfMax; totalHalfObt += halfObt;
    totalAnnMax += annMax; totalAnnObt += annObt;
    totalFinalMax += finalMax; totalFinalObt += finalObt;

    return (
      <tr key={sub} className="text-center">
        <td style={{ textAlign: 'left', fontWeight: 'bold' }}>{sub}</td>
        <td>{halfMax}</td><td>{halfObt}</td><td>{getGrade(halfObt, halfMax)}</td>
        <td>{annMax}</td><td>{annObt}</td><td>{getGrade(annObt, annMax)}</td>
        <td>{finalMax}</td><td>{finalObt}</td><td>{getGrade(finalObt, finalMax)}</td>
      </tr>
    );
  });

  const co = student.co_scholastic_grades || {};

  let finalPercentage = totalFinalMax > 0 ? ((totalFinalObt / totalFinalMax) * 100).toFixed(2) : 0;
  let isPass = finalPercentage >= 33;
  let resultText = isPass ? "PASS" : "FAIL";
  let resultClass = isPass ? "pass-text" : "fail-text";
  let finalGrade = getGrade(totalFinalObt, totalFinalMax);
  let promotedText = isPass ? "Promoted" : "Detained";

  return (
    <>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            display: flex;
            justify-content: center;
            padding: 20px;
        }
        .marksheet-container {
            width: 800px;
            background-color: #ffffff;
            border: 3px solid #005b9f;
            padding: 10px;
            box-shadow: 0 0 10px rgba(0,0,0,0.2);
            position: relative;
        }
        .inner-border { border: 1px solid #005b9f; padding: 10px; }
        .header { display: flex; align-items: center; justify-content: space-between; color: #004b87; margin-bottom: 10px; position: relative; }
        .logo { width: 70px; height: 70px; background-color: #004b87; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #fff; font-size: 10px; text-align: center; border: 3px solid #ffcc00; }
        .school-info { text-align: center; flex-grow: 1; }
        .school-name { font-size: 26px; font-weight: 900; letter-spacing: 0.5px; margin-bottom: 4px; text-transform: uppercase; }
        .school-address { font-size: 14px; font-weight: bold; }
        .dise-code { font-size: 12px; font-weight: bold; position: absolute; right: 0; bottom: 0; color: #333; }
        .session-banner { background-color: #e6f2ff; color: #004b87; text-align: center; font-size: 14px; font-weight: bold; padding: 6px; border-top: 2px solid #005b9f; border-bottom: 2px solid #005b9f; margin-bottom: 10px; }
        table { width: 100%; border-collapse: collapse; margin-bottom: 10px; font-size: 11px; }
        th, td { border: 1px solid #333; padding: 5px 6px; }
        th { background-color: #f9f9f9; text-align: left; font-weight: bold; color: #000; }
        .text-center { text-align: center !important; }
        .bg-light-blue { background-color: #e6f2ff !important; }
        .photo-box { width: 80px; height: 100px; border: 1px solid #999; margin: auto; display: flex; align-items: center; justify-content: center; color: #ccc; background-color: #fdfdfd; }
        .section-title { color: #005b9f; font-size: 13px; margin-bottom: 4px; display: flex; align-items: baseline; }
        .section-title span { color: #e66; font-size: 9px; margin-left: 5px; font-weight: normal; }
        .footer-remarks { display: flex; justify-content: space-between; font-size: 12px; font-weight: bold; margin-top: 15px; padding: 0 10px; }
        .signatures { display: flex; justify-content: space-between; margin-top: 50px; padding: 0 20px; }
        .sig-block { text-align: center; font-size: 12px; font-weight: bold; color: #004b87; }
        .sig-line { width: 150px; border-top: 1px solid #004b87; margin-bottom: 5px; }
        .stamp-text { font-size: 10px; font-weight: normal; margin-top: 2px; }
        .bold-val td { font-weight: bold; color: #333; }
        .pass-text { color: #28a745; font-weight: bold; }
        .fail-text { color: #dc3545; font-weight: bold; }
      `}</style>

      <div className="marksheet-container">
        <div className="inner-border">
          
          <div className="header">
            <img 
              src="/image/LOGO.jpg.jpeg" 
              alt="Rose Convent High School Logo" 
              style={{
                width: '72px',
                height: '72px',
                borderRadius: '50%',
                objectFit: 'cover',
                boxShadow: '0 0 0 2px #C8972A, 0 0 0 4px rgba(200,151,42,0.3)'
              }} 
            />
            <div className="school-info">
              <div className="school-name">Rose Convent High School</div>
              <div className="school-address">DILAURA, SATNA (M.P.)</div>
            </div>
            <div className="dise-code">Dise Code : 23130731404</div>
          </div>

          <div className="session-banner">
            STUDENT PROGRESS CARD (SESSION : 2025-26)
          </div>

          <table>
            <tbody>
              <tr>
                <th style={{ width: '18%' }}>Roll Number</th>
                <td style={{ width: '15%' }}>{student.roll_number || 'N/A'}</td>
                <th style={{ width: '18%' }}>Scholar Number</th>
                <td colSpan={2}>{student.scholar_no || 'N/A'}</td>
                <td rowSpan={7} style={{ width: '15%', padding: '2px', verticalAlign: 'top' }}>
                  <div className="photo-box">PHOTO</div>
                </td>
              </tr>
              <tr>
                <th>Name of Student</th>
                <td colSpan={4} style={{ fontWeight: 'bold' }}>{student.student_name || 'N/A'}</td>
              </tr>
              <tr>
                <th>Father's Name</th>
                <td colSpan={4}>{student.father_name || 'N/A'}</td>
              </tr>
              <tr>
                <th>Mothers' Name</th>
                <td colSpan={4}>{student.mother_name || 'N/A'}</td>
              </tr>
              <tr>
                <th>Date of Birth</th>
                <td>{student.dob || 'N/A'}</td>
                <th>in words</th>
                <td colSpan={2}>{student.dob_in_words || 'N/A'}</td>
              </tr>
              <tr>
                <th>Class</th>
                <td>{student.class || 'N/A'}</td>
                <th>Section</th>
                <td colSpan={2}>Section - {student.section || 'A'}</td>
              </tr>
              <tr>
                <th>Caste / Category</th>
                <td>{student.caste || 'N/A'}</td>
                <th>SSSM ID</th>
                <td colSpan={2}>{student.samagra_id || 'N/A'}</td>
              </tr>
              <tr>
                <th>Aadhaar Number</th>
                <td>{student.aadhar_number || 'N/A'}</td>
                <th>Appar ID</th>
                <td>{student.appar_id || 'N/A'}</td>
                <th style={{ width: '12%' }}>Medium</th>
                <td style={{ fontWeight: 'bold' }}>ENGLISH</td>
              </tr>
            </tbody>
          </table>

          <div className="section-title" style={{ marginTop: '8px' }}>
            Student's Performance <span>(As per order of M.P. Govt.)</span>
          </div>
          <table>
            <thead>
              <tr className="bg-light-blue text-center">
                <th rowSpan={2} className="text-center" style={{ width: '16%' }}>Subjects</th>
                <th colSpan={3} className="text-center">Half Yearly Evaluation</th>
                <th colSpan={3} className="text-center">Annual Evaluation</th>
                <th colSpan={3} className="text-center">Final Assessment</th>
              </tr>
              <tr className="bg-light-blue text-center">
                <th className="text-center">Max.</th><th className="text-center">Obt.</th><th className="text-center">Grade</th>
                <th className="text-center">Max.</th><th className="text-center">Obt.</th><th className="text-center">Grade</th>
                <th className="text-center">Max.</th><th className="text-center">Obt.</th><th className="text-center">Grade</th>
              </tr>
            </thead>
            <tbody>
              {subjectRows}
              <tr className="text-center bold-val">
                <td style={{ textAlign: 'left' }}>Total</td>
                <td>{totalHalfMax}</td><td>{totalHalfObt}</td><td>{getGrade(totalHalfObt, totalHalfMax)}</td>
                <td>{totalAnnMax}</td><td>{totalAnnObt}</td><td>{getGrade(totalAnnObt, totalAnnMax)}</td>
                <td>{totalFinalMax}</td><td>{totalFinalObt}</td><td>{getGrade(totalFinalObt, totalFinalMax)}</td>
              </tr>
            </tbody>
          </table>

          <div className="section-title">Performance in Co-Scholastic Areas :</div>
          <table>
            <thead>
              <tr>
                <th colSpan={2} className="text-center bg-light-blue" style={{ width: '33.33%' }}>Co-Curricular Activities</th>
                <th colSpan={2} className="text-center bg-light-blue" style={{ width: '33.33%' }}></th>
                <th colSpan={2} className="text-center bg-light-blue" style={{ width: '33.33%' }}>Social Activities</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>LITERARY SKILLS</td><td className="text-center">{co.literary_skills || '-'}</td>
                <td>REGULARITY</td><td className="text-center">{co.regularity || '-'}</td>
                <td>ENV. CONSCIOUSNESS</td><td className="text-center">{co.environmental_consciousness || '-'}</td>
              </tr>
              <tr>
                <td>SCIENTIFIC SKILLS</td><td className="text-center">{co.scientific_skills || '-'}</td>
                <td>PUNCTUALITY</td><td className="text-center">{co.punctuality || '-'}</td>
                <td>LEADERSHIP</td><td className="text-center">{co.leadership_qualities || '-'}</td>
              </tr>
              <tr>
                <td>CULTURAL SKILLS</td><td className="text-center">{co.cultural_skills || '-'}</td>
                <td>CLEANLINESS</td><td className="text-center">{co.cleanliness || '-'}</td>
                <td>TRUTHFULNESS</td><td className="text-center">{co.truthfulness || '-'}</td>
              </tr>
              <tr>
                <td>CREATIVITY</td><td className="text-center">{co.creativity || '-'}</td>
                <td>DISCIPLINE</td><td className="text-center">{co.discipline || '-'}</td>
                <td>HONESTY</td><td className="text-center">{co.honesty || '-'}</td>
              </tr>
              <tr>
                <td>SPORTS</td><td className="text-center">{co.sports || '-'}</td>
                <td>CO-OPERATION</td><td className="text-center">{co.co_operation || '-'}</td>
                <td>EXPRESSIVE</td><td className="text-center">{co.expressive || '-'}</td>
              </tr>
            </tbody>
          </table>

          <div className="section-title" style={{ marginTop: '5px' }}>Final Result :</div>
          <table>
            <thead>
              <tr className="bg-light-blue text-center">
                <th className="text-center">Max. Marks</th>
                <th className="text-center">Obt. Marks</th>
                <th className="text-center">Result</th>
                <th className="text-center">Percentage</th>
                <th className="text-center">Grade</th>
              </tr>
            </thead>
            <tbody>
              <tr className="text-center" style={{ fontWeight: 'bold' }}>
                <td>{totalFinalMax}</td>
                <td>{totalFinalObt}</td>
                <td className={resultClass}>{resultText}</td>
                <td>{finalPercentage} %</td>
                <td>{finalGrade}</td>
              </tr>
            </tbody>
          </table>

          <div className="footer-remarks">
            <div>Class Teacher Remark : <span style={{ fontWeight: 'normal' }}>{student.class_teacher_remark || 'Good'}</span></div>
            <div style={{ marginRight: '20px' }}>Status : <span style={{ fontWeight: 'normal' }}>{promotedText}</span></div>
          </div>

          <div className="signatures">
            <div className="sig-block" style={{ color: '#000' }}>
              <div className="sig-line" style={{ borderColor: '#000' }}></div>
              Class Teacher
            </div>
            <div className="sig-block">
              <div className="sig-line"></div>
              Principal<br/>
              <div className="stamp-text">Rose Convent High School<br/>Head of School</div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default Marksheet;
