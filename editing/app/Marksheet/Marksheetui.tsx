'use client'
import  { useRef } from 'react';
import './Marksheet.css'; // Aapki saari CSS isme hogi

const Marksheet = ({ studentData, classGroup, stream, marksData }) => {
  const marksheetRef = useRef();

  // Function to render the Marks Table based on Class Group
  const renderMarksTable = () => {
    // CLASS 9: Different Marking Scheme (5, 5, 70, 20)
    if (classGroup === '9') {
      return (
        <table className="marks-table">
          <thead>
            <tr className="hrow1">
              <th style={{ width: '26%', textAlign: 'left', paddingLeft: '12px' }}>Subject</th>
              <th style={{ width: '7%' }}>Max<br/>Marks</th>
              <th style={{ width: '11%' }}>Test<br/>(5)</th>
              <th style={{ width: '13%' }}>Half Yearly<br/>(5)</th>
              <th style={{ width: '13%' }}>Annual<br/>(70)</th>
              <th style={{ width: '12%' }}>Project<br/>(20)</th>
              <th style={{ width: '9%' }}>Total<br/>Obtained</th>
              <th style={{ width: '9%' }}>%</th>
              <th style={{ width: '8%' }}>Grade</th>
            </tr>
          </thead>
          <tbody>
            {marksData.map((item, index) => (
              <tr key={index}>
                <td className="sub-name"><span className="sub-num">{index + 1}</span>{item.subject}</td>
                <td>100</td>
                <td>{item.test}</td>
                <td>{item.halfYearly}</td>
                <td>{item.annual}</td>
                <td>{item.project}</td>
                <td style={{ fontWeight: 'bold' }}>{item.total}</td>
                <td>{item.total}%</td>
                <td style={{ fontWeight: 700, color: '#0A6E36' }}>{item.grade}</td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    } 

    // ALL OTHER CLASSES (LKG to 8, and 11th)
    return (
      <table className="marks-table">
        <thead>
          <tr className="hrow1">
            <th style={{ width: '26%', textAlign: 'left', paddingLeft: '12px' }}>Subject</th>
            <th style={{ width: '7%' }}>Max<br/>Marks</th>
            <th style={{ width: '11%' }}>Monthly<br/>Test</th>
            <th style={{ width: '13%' }}>Half Yearly<br/>Exam</th>
            <th style={{ width: '13%' }}>Annual<br/>Written</th>
            <th style={{ width: '12%' }}>Project /<br/>Practical</th>
            <th style={{ width: '9%' }}>Total<br/>Obtained</th>
            <th style={{ width: '9%' }}>%</th>
            <th style={{ width: '8%' }}>Grade</th>
          </tr>
          <tr className="hrow2">
            <th></th><th></th>
            <th>/ 10</th><th>/ 20</th><th>/ 60</th><th>/ 10</th><th>/ 100</th>
            <th></th><th>Consol.</th>
          </tr>
        </thead>
        <tbody>
          {marksData.map((item, index) => (
            <tr key={index}>
              <td className="sub-name"><span className="sub-num">{index + 1}</span>{item.subject}</td>
              <td>100</td>
              <td>{item.monthly}</td>
              <td>{item.halfYearly}</td>
              <td>{item.annual}</td>
              <td>{item.project}</td>
              <td style={{ fontWeight: 'bold' }}>{item.total}</td>
              <td>{item.total}%</td>
              <td style={{ fontWeight: 700, color: '#0D7A4A' }}>{item.grade}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
      <div className="page" ref={marksheetRef}>
        
        {/* Frame borders */}
        <div className="frame-outer"></div>
        <div className="frame-inner"></div>
        <div className="side-line-left"></div>
        <div className="side-line-right"></div>

        {/* Header Section */}
        <div className="header">
          <div className="logo-wrap">
            <img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/..." alt="Logo" style={{ width: '72px', height: '72px', borderRadius: '50%', objectFit: 'cover', boxShadow: '0 0 0 2px #C8972A, 0 0 0 4px rgba(200,151,42,0.3)' }} />
          </div>
          <div className="school-info">
            <div className="school-est">Est. · 1972 · Affiliated to CBSE / State Board · Reg. No. MP/XXX/2024</div>
            <div className="school-name">ROSE CONVENT HIGH SCHOOL</div>
            <div className="school-tagline">"Bloom in Knowledge · Grow in Grace · Shine in Service"</div>
            <div className="school-address">Satna (M.P.) · Pin: 485 001 · Ph: 07672-XXXXXX</div>
          </div>
          <div className="accred-badge">
            <div className="accred-ring">
              <div className="accred-year">A+</div>
              <div className="accred-label">GRADE</div>
            </div>
          </div>
        </div>

        <div className="gold-divider"></div>

        {/* Title Band */}
        <div className="title-band">
          <div>
            <div className="doc-title">Official Mark Sheet</div>
            <div className="doc-title-sub">
              {classGroup === '11' ? `Senior Secondary — ${stream} Stream` : 'Annual Academic Performance Record'}
            </div>
          </div>
          <div className="session-badge">Session 2024 – 2025</div>
        </div>

        {/* Student Info */}
        <div className="student-section">
          <div className="student-grid">
            <div className="field-group span2">
              <div className="field-label">Student Full Name</div>
              <div className="field-value" style={{ fontWeight: 700, fontSize: '11px', color: '#1A0A2E' }}>{studentData.name}</div>
            </div>
            <div className="field-group">
              <div className="field-label">Roll Number</div>
              <div className="field-value" style={{ fontWeight: 600 }}>{studentData.rollNo}</div>
            </div>
            {/* Add more student details mapping here based on your HTML */}
            <div className="field-group">
              <div className="field-label">Class</div>
              <div className="field-value" style={{ fontWeight: 700, color: '#1A0A2E' }}>{studentData.className}</div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="section-divider">
          <div className="div-diamond"></div>
          <div className="div-line"></div>
          <div className="div-label">Academic Assessment — Marks &amp; Grades</div>
          <div className="div-line"></div>
          <div className="div-diamond"></div>
        </div>

        {/* Dynamic Table Section */}
        <div className="table-section">
          {renderMarksTable()}
        </div>

        {/* Lower Panels (Co-Curricular & Traits) - Standardized for all */}
        <div className="lower-panels">
           {/* ... Paste your .panel divs from your HTML here ... */}
        </div>

        {/* Signatures & Footer */}
        <div className="sig-section">
          <div className="sig-block">
            <div className="sig-area"></div>
            <div className="sig-title">Class Teacher</div>
            <div className="sig-sub">Signature &amp; Date</div>
          </div>
          <div className="center-seal">
            <div className="seal-outer">
              <div className="seal-inner">
                <div className="seal-text">OFFICIAL<br/>SCHOOL<br/>SEAL</div>
              </div>
            </div>
          </div>
          <div className="sig-block">
            <div className="sig-area"></div>
            <div className="sig-title">Principal</div>
            <div className="sig-sub">Signature &amp; Stamp</div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Marksheet;