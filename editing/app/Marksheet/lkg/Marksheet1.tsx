'use client'
// frontend/src/components/MarksheetManager.jsx
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import './Marksheet.css'; // Assume the CSS provided previously is here

// Provide the logo constant as requested
const LOGO = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIbGNtcwIQAABtbnRyUkdCIFhZWiAH4gADABQACQAOAB1hY3NwTVNGVAAAAABzYXdzY3RybAAAAAAAAAAAAAAAAAAA9tYAAQAAAADTLWhhbmSdkQA9QICwPUB0LIGepSKOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAABxjcHJ0AAABDAAAAAx3dHB0AAABGAAAABRyWFlaAAABLAAAABRnWFlaAAABQAAAABRiWFlaAAABVAAAABRyVFJDAAABaAAAAGBnVFJDAAABaAAAAGBiVFJDAAABaAAAAGBkZXNjAAAAAAAAAAV1UkdCAAAAAAAAAAAAAAAAdGV4dAAAAABDQzAAWFlaIAAAAAAAAPNUAAEAAAABFslYWVogAAAAAAAAb6AAADjyAAADj1hZWiAAAAAAAABilgAAt4kAABjaWFlaIAAAAAAAACSgAAAPhQAAtsRjdXJ2AAAAAAAAACoAAAB8APgBnAJ1A4MEyQZOCBIKGAxiDvQRzxT2GGocLiBDJKwpai5+M+s5sz/WRldNNlR2XBdkHWyGdVZ+jYgskjacq6eMstu+mcrH12Xkd/H5////2wBDAAkGBwgHBgkICAgKCgkLDhcPDg0NDhwUFREXIh4jIyEeICAlKjUtJScyKCAgLj8vMjc5PDw8JC1CRkE6RjU7PDn/wAARCAKKAooDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oAMBAAIRAxEAPwD3+ii";

// Grading scale helper for frontend display/temp calc
const getGrade = (pct) => {
    if (pct > 85) return 'A+'; if (pct >= 76) return 'A';
    if (pct >= 66) return 'B+'; if (pct >= 56) return 'B';
    if (pct >= 51) return 'C+'; if (pct >= 46) return 'C';
    if (pct >= 33) return 'D'; return 'E';
};

const MarksheetManager = ({ marksheetId }) => {
    const [loading, setLoading] = useState(true);
    const [isEditMode, setIsEditMode] = useState(false);
    const [formData, setFormData] = useState(null);
    const printRef = useRef();

    // Load Data
    useEffect(() => {
        // Replace with actual API call: axios.get(`/api/marksheet/${marksheetId}`)
        // Simulating fetch for LKG structure based on image style
        const mockData = {
            _id: '1',
            studentInfo: {
                fullName: "Ayush Sen", rollNo: "101", class: "LKG", section: "B",
                dob: new Date('2019-03-29'), dobWords: "Twenty-Ninth March Two Thousand Nineteen",
                scholarNo: "123", aadhaarId: "9034 7011 9081", samagraId: "15633886"
            },
            session: "2024–2025",
            academicPerformance: [
                { subjectName: "English", term1: { marksObtained: 42 }, term2: { marksObtained: 45 }, maxMarks: 100 },
                { subjectName: "Hindi", term1: { marksObtained: 40 }, term2: { marksObtained: 42 }, maxMarks: 100 },
                { subjectName: "Mathematics", term1: { marksObtained: 48 }, term2: { marksObtained: 49 }, maxMarks: 100 },
            ],
            coCurricular: [{ name: "Literary", grade: "A" }, { name: "Cultural", grade: "A+" }],
            personalQualities: [{ name: "Cleanliness", grade: "A+" }, { name: "Discipline", grade: "A" }],
            finalResult: { grandTotal: 266, totalMaxMarks: 300, overallPercentage: 88.66, overallGrade: "A+", status: "PASS", promotedTo: "UKG" }
        };
        // Apply initial formatting/calculation
        setFormData(calculateFormTotals(mockData));
        setLoading(false);
    }, [marksheetId]);

    // Internal Calculator for instantaneous Frontend feedback during Edit
    function calculateFormTotals(data) {
        let grandTotal = 0;
        let totalMax = 0;
        const updatedPerformance = data.academicPerformance.map(sub => {
            const t1 = parseInt(sub.term1?.marksObtained || 0);
            const t2 = parseInt(sub.term2?.marksObtained || 0);
            const total = t1 + t2;
            const max = sub.maxMarks || 100;
            const pct = (total / max) * 100;
            grandTotal += total;
            totalMax += max;
            return { ...sub, total: { marksObtained: total, grade: getGrade(pct) } };
        });

        const finalPct = totalMax > 0 ? (grandTotal / totalMax) * 100 : 0;
        return {
            ...data,
            academicPerformance: updatedPerformance,
            finalResult: {
                ...data.finalResult,
                grandTotal,
                totalMaxMarks: totalMax,
                overallPercentage: parseFloat(finalPct.toFixed(2)),
                overallGrade: getGrade(finalPct),
                status: finalPct >= 33 ? 'PASS' : 'FAIL'
            }
        };
    }

    // Handle Mark Changes in Edit Mode
    const handleMarkChange = (index, term, value) => {
        const val = value === '' ? '' : Math.min(50, Math.max(0, parseInt(value) || 0)); // Cap LKG terms at 50

        setFormData(prev => {
            const newPerformance = [...prev.academicPerformance];
            newPerformance[index] = {
                ...newPerformance[index],
                [term]: { marksObtained: val }
            };
            // Trigger recalculation of the whole form state
            return calculateFormTotals({ ...prev, academicPerformance: newPerformance });
        });
    };

    // Save Changes to Backend
    const handleSave = async () => {
        try {
            setLoading(true);
            // axios.put(`/api/marksheet/${marksheetId}`, formData)
            console.log("Saving to Backend (re-calculation happens there too):", formData);
            // Simulate success
            setIsEditMode(false);
        } catch (error) {
            alert("Error saving marksheet");
        } finally {
            setLoading(false);
        }
    };

    // Download PDF matching UI and specific Printer Settings
    const downloadPDF = () => {
        const input = printRef.current;
        // Optimization for PDF quality matching web view
        html2canvas(input, {
            scale: 2, // Matches image scaling requirement
            useCORS: true,
            logging: false,
            backgroundColor: "#FFFFFF" // Ensure white background of paper area
        }).then((canvas) => {
            const imgData = canvas.toDataURL('image/jpeg', 1.0);
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
            const imgWidth = canvas.width;
            const imgHeight = canvas.height;
            const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
            const imgX = (pdfWidth - imgWidth * ratio) / 2;
            const imgY = 0; // Align top

            pdf.addImage(imgData, 'JPEG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
            // Standard PDF settings apply on browser download dialog
            pdf.save(`Marksheet_${formData.studentInfo.fullName.replace(' ', '_')}.pdf`);
        });
    };

    if (loading) return <div>Loading...</div>;

    // Helper Component for cells
    const DataCell = ({ value, index, term, isEdit, style }) => {
        if (isEdit && term) {
            return (
                <td style={style}>
                    <input
                        type="number"
                        className="edit-input marks-input"
                        value={value}
                        onChange={(e) => handleMarkChange(index, term, e.target.value)}
                        max={50} min={0}
                    />
                </td>
            );
        }
        return <td style={style}>{value}</td>;
    };

    return (
        <div className="manager-container">
            {/* Main Marksheet Area */}
            <div ref={printRef} className="print-area">
                <div className="page">
                    {/* Frame borders & Ornaments (Keep exact HTML structure) */}
                    <div className="frame-outer"></div><div className="frame-inner"></div>
                    <div className="side-line-left"></div><div className="side-line-right"></div>
                    {/* Watermark SVG */}
                    <div className="watermark" dangerouslySetInnerHTML={{ __html: `<svg width="300" height="300"...>...</svg>` }} />

                    {/* HEADER */}
                    <div className="header">
                        <div className="logo-wrap"><img src={LOGO} alt="School Logo" /></div>
                        <div className="school-info">
                            <div className="school-est">Est. · 1972 · Affiliated to CBSE · Reg. No. XXX</div>
                            <div className="school-name">ROSE CONVENT HIGH SCHOOL</div>
                            <div className="school-tagline">"Bloom in Knowledge · Grow in Grace"</div>
                            <div className="school-address">Satna (M.P.) · Pin: 485 001</div>
                        </div>
                        <div className="accred-badge"><div className="accred-ring"><div className="accred-year">A+</div><div className="accred-label">GRADE</div></div></div>
                    </div>
                    <div className="gold-divider"></div>

                    {/* TITLE & SESSION */}
                    <div className="title-band">
                        <div>
                            <div className="doc-title">Official Mark Sheet</div>
                            <div className="doc-title-sub">Annual Academic Record — Pre-Primary (LKG-UKG)</div>
                        </div>
                        <div className="session-badge">Session {formData.session}</div>
                    </div>

                    {/* STUDENT INFO */}
                    <div className="student-section">
                        <div className="student-grid">
                            <div className="field-group span2">
                                <div className="field-label">Student Full Name</div>
                                <div className="field-value highlight">{formData.studentInfo.fullName}</div>
                            </div>
                            <div className="field-group">
                                <div className="field-label">Roll Number</div>
                                <div className="field-value strong">{formData.studentInfo.rollNo}</div>
                            </div>
                            <div className="field-group">
                                <div className="field-label">Class & Section</div>
                                <div className="field-value strong">{formData.studentInfo.class} — {formData.studentInfo.section}</div>
                            </div>
                        </div>
                    </div>

                    {/* DIVIDER */}
                    <div className="section-divider">
                        <div className="div-diamond"></div><div className="div-line"></div>
                        <div className="div-label">Academic Assessment — 3 Main Subjects</div>
                        <div className="div-line"></div><div className="div-diamond"></div>
                    </div>

                    {/* MARKS TABLE - Optimized for LKG-UKG structure while matching style */}
                    <div className="table-section">
                        <table className="marks-table lkg-table">
                            <thead>
                                <tr className="hrow1">
                                    <th style={{ width: '35%' }}>Subject</th>
                                    <th style={{ width: '10%' }}>Max</th>
                                    <th style={{ width: '15%' }}>Term 1</th>
                                    <th style={{ width: '15%' }}>Term 2</th>
                                    <th style={{ width: '15%' }}>Total</th>
                                    <th style={{ width: '10%' }}>Grade</th>
                                </tr>
                                <tr className="hrow2">
                                    <th></th><th>100</th><th>/ 50</th><th>/ 50</th><th>/ 100</th><th>Consol.</th>
                                </tr>
                            </thead>
                            <tbody>
                                {formData.academicPerformance.map((sub, index) => (
                                    <tr key={index}>
                                        <td className="sub-name"><span className="sub-num">{index + 1}</span>{sub.subjectName}</td>
                                        <td>{sub.maxMarks}</td>
                                        <DataCell isEdit={isEditMode} value={sub.term1?.marksObtained ?? 0} index={index} term="term1" />
                                        <DataCell isEdit={isEditMode} value={sub.term2?.marksObtained ?? 0} index={index} term="term2" />
                                        <td style={{ fontWeight: 800, color: '#1A0A2E' }}>{sub.total?.marksObtained ?? 0}</td>
                                        <td style={{ fontWeight: 900, color: getGradeColor(sub.total?.grade ?? 'E') }}>{sub.total?.grade ?? 'E'}</td>
                                    </tr>
                                ))
                                }
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td>Grand Total</td>
                                    <td>{formData.finalResult.totalMaxMarks}</td>
                                    <td colSpan={2}>Aggregate Percentage: {formData.finalResult.overallPercentage}%</td>
                                    <td style={{ fontSize: '10px', fontWeight: 900 }}>{formData.finalResult.grandTotal}</td>
                                    <td style={{ fontSize: '10px', fontWeight: 900, color: '#E5B94A' }}>{formData.finalResult.overallGrade}</td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>

                    {/* CO-CURRICULAR & PERSONAL QUALITIES (Paste your exact panel structure here) */}
                    <div className="lower-panels">
                        {/* Co-Curricular Panel */}
                        <div className="panel">
                            <div className="panel-head blue"><div className="panel-head-dot"></div>Co-Curricular Activities</div>
                            <table className="panel-table">
                                <thead><tr><th>Activity</th><th style={{ textAlign: 'center' }}>Grade</th></tr></thead>
                                <tbody>
                                    {formData.coCurricular.map((act, idx) => (
                                        <tr key={idx}><td>{act.name}</td>
                                            <td style={{ textAlign: 'center', fontWeight: 700, color: getGradeColor(act.grade) }}>{act.grade}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        {/* Personal Qualities Panel */}
                        <div className="panel">
                            <div className="panel-head gold-head"><div className="panel-head-dot"></div>Personal Social Qualities</div>
                            <table className="panel-table">
                                <thead><tr><th>Quality</th><th style={{ textAlign: 'center' }}>Grade</th></tr></thead>
                                <tbody>
                                    {formData.personalQualities.map((q, idx) => (
                                        <tr key={idx}><td><span className="p-num">{`0${idx + 1}`}</span>{q.name}</td>
                                            <td style={{ textAlign: 'center', fontWeight: 700, color: getGradeColor(q.grade) }}>{q.grade}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* RESULT BOX */}
                    <div className="note-result">
                        <div className="note-box">Grades reflect holistic development...</div>
                        <div className="result-box result-summary">
                            <div className="result-row-item">
                                <div className="result-row-label">Annual Result</div>
                                <div className="result-row-field final-stat" style={{ color: formData.finalResult.status === 'PASS' ? '#E5B94A' : '#B01C2E' }}>
                                    {formData.finalResult.status} — Grade {formData.finalResult.overallGrade}
                                </div>
                            </div>
                            <div className="result-row-item">
                                <div className="result-row-label">Promoted to Class</div>
                                <div className="result-row-field promoted-field">{formData.finalResult.promotedTo}</div>
                            </div>
                        </div>
                    </div>

                    {/* SIGNATURES */}
                    <div className="sig-section">
                        <div className="sig-block"><div className="sig-area"></div><div className="sig-title">Class Teacher</div></div>
                        <div className="center-seal"><div className="seal-outer"><div className="seal-inner"><div className="seal-text">OFFICIAL<br />SCHOOL<br />SEAL</div></div></div></div>
                        <div className="sig-block"><div className="sig-area"></div><div className="sig-title">Principal</div></div>
                    </div>
                </div>
            </div>

            {/* ACTION BUTTONS - Fixed at bottom outside print area */}
            <div className="action-bar no-print">
                {isEditMode ? (
                    <>
                        <button className="btn btn-save" onClick={handleSave}>Save Changes</button>
                        <button className="btn btn-cancel" onClick={() => setIsEditMode(false)}>Cancel</button>
                    </>
                ) : (
                    <>
                        <button className="btn btn-download" onClick={downloadPDF}>Download PDF</button>
                        <button className="btn btn-edit" onClick={() => setIsEditMode(true)}>Edit Marksheet</button>
                    </>
                )}
            </div>
        </div>
    );
};

// Simple helper for grade colors matching ref image
const getGradeColor = (grade) => {
    if (grade.includes('A')) return '#0A6E36'; // Green
    if (grade.includes('B')) return '#1244A8'; // Blue
    if (grade.includes('C')) return '#9A6800'; // Orange
    return '#A01828'; // Red
};

export default MarksheetManager;