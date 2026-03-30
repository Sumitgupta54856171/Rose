'use client'
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";

interface Student {
  _id: string;
  class: string;
  section: string;
  roll_number: string;
  scholar_no: string;
  student_name: string;
  mother_name: string;
  father_name: string;
  dob: string;
  dob_in_words: string;
  caste: string;
  aadhar_number: string;
  appar_id: string;
  samagra_id: string;
  dis_code: string;
}

const SAMPLE_STUDENTS: Student[] = [
  {
    _id: "1",
    class: "6", section: "A", roll_number: "613", scholar_no: "432",
    student_name: "Ganesh Singh", mother_name: "Mrs Pooja Singh",
    father_name: "Mr. Ashok Singh", dob: "18/01/2014",
    dob_in_words: "Eighteenth January Two Thousand Fourteen",
    caste: "Gen", aadhar_number: "654232496421",
    appar_id: "368206103841", samagra_id: "305287760", dis_code: "N/A",
  },
  {
    _id: "2",
    class: "3", section: "B", roll_number: "317", scholar_no: "614",
    student_name: "Vani Singh", mother_name: "Mallavi Singh",
    father_name: "Chandrashekhar Singh", dob: "20/07/2016",
    dob_in_words: "Twentieth July Two Thousand Sixteen",
    caste: "Gen", aadhar_number: "264670624026",
    appar_id: "691295660398", samagra_id: "310649934", dis_code: "N/A",
  },
  {
    _id: "3",
    class: "5", section: "A", roll_number: "210", scholar_no: "521",
    student_name: "Riya Sharma", mother_name: "Mrs Sunita Sharma",
    father_name: "Mr. Rakesh Sharma", dob: "05/03/2015",
    dob_in_words: "Fifth March Two Thousand Fifteen",
    caste: "OBC", aadhar_number: "123456789012",
    appar_id: "111222333444", samagra_id: "987654321", dis_code: "N/A",
  },
  {
    _id: "4",
    class: "8", section: "C", roll_number: "401", scholar_no: "308",
    student_name: "Arjun Patel", mother_name: "Mrs Kavita Patel",
    father_name: "Mr. Suresh Patel", dob: "12/11/2012",
    dob_in_words: "Twelfth November Two Thousand Twelve",
    caste: "Gen", aadhar_number: "998877665544",
    appar_id: "556677889900", samagra_id: "112233445", dis_code: "N/A",
  },
];

const FIELDS = [
  { key: "student_name", label: "Student Name" },
  { key: "class", label: "Class" },
  { key: "section", label: "Section" },
  { key: "roll_number", label: "Roll Number" },
  { key: "scholar_no", label: "Scholar No" },
  { key: "father_name", label: "Father Name" },
  { key: "mother_name", label: "Mother Name" },
  { key: "dob", label: "Date of Birth" },
  { key: "dob_in_words", label: "DOB in Words" },
  { key: "caste", label: "Caste" },
  { key: "aadhar_number", label: "Aadhar Number" },
  { key: "appar_id", label: "Appar ID" },
  { key: "samagra_id", label: "Samagra ID" },
  { key: "dis_code", label: "DIS Code" },
];

function getInitials(name: string): string {
  return name.split(" ").slice(0, 2).map((n: string) => n[0]).join("").toUpperCase();
}

const COLORS = ["#FF6B6B","#FF9F43","#F9CA24","#6AB04C","#22A6B3","#4834D4","#BE2EDD","#E84393"];
function getColor(id: string): string { return COLORS[parseInt(id) % COLORS.length]; }

async function marksheetredirect(id: string): Promise<void> {
  try {
    window.location.href = `http://localhost:5000/api/students/marksheet/${id}`;
  } catch (error) {
    window.alert("Failed to open marksheet. Please try again later.");
  }
}

export default function StudentList() {

  const [students, setStudents] = useState<Student[]>(SAMPLE_STUDENTS);
  const [search, setSearch] = useState("");
  const [detailStudent, setDetailStudent] = useState<Student | null>(null);
  const [editStudent, setEditStudent] = useState<Student | null>(null);
  const [editForm, setEditForm] = useState<Partial<Student>>({});
  const [saved, setSaved] = useState(false);
  const studentClass = useParams().class || "";

  const filtered = students.filter(s =>
    s.student_name.toLowerCase().includes(search.toLowerCase()) ||
    s.class.includes(search) ||
    s.roll_number.includes(search) ||
    s.scholar_no.includes(search)
  );

  function openEdit(student: Student): void {
    setEditForm({ ...student });
    setEditStudent(student);
    setDetailStudent(null);
    setSaved(false);
  }
useEffect(()=>{

const studentdetail = async ()=>{
  try{
    const response = await axios.get(`http://localhost:5000/api/students/student/${studentClass}`);
    console.log(response.data);
    
    // Extract data from response - API returns { success, count, data: [...] }
    let studs = SAMPLE_STUDENTS;
    if (Array.isArray(response.data)) {
      studs = response.data;
    } else if (Array.isArray(response.data?.data)) {
      studs = response.data.data;
    } else if (Array.isArray(response.data?.students)) {
      studs = response.data.students;
    }
    setStudents(studs);
  }catch(error){
    console.error("Error fetching students:", error);
    window.alert("Failed to fetch students. Please try again later.");
    setStudents(SAMPLE_STUDENTS); // Fallback to sample data
  }
  
}
if (studentClass) { // Only fetch if studentClass is available
  studentdetail();
}

},[studentClass])

  async function handleSave(): Promise<void> {
    try{
      const response = await axios.put(`http://localhost:5000/api/students/${editForm._id}`, editForm);
      console.log(response.data);
    } catch (error) {
      console.error("Error saving student:", error);
      window.alert("Failed to save student. Please try again later.");
    }
    setStudents(prev => prev.map(s => s._id === (editForm as Student)._id ? { ...(editForm as Student) } : s));
    setSaved(true);
    setTimeout(() => { setEditStudent(null); setSaved(false); }, 1000);
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: "#f0f4f8",
      fontFamily: "'Palatino Linotype', 'Book Antiqua', Palatino, serif",
    }}>

      {/* ── HEADER ── */}
      <div style={{
        background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
        padding: "28px 40px 24px",
        boxShadow: "0 4px 24px rgba(0,0,0,0.25)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
          <span style={{ fontSize: 30 }}>🌹</span>
          <div>
            <div style={{
              fontSize: "1.4rem", fontWeight: 700, letterSpacing: "0.04em",
              background: "linear-gradient(90deg, #f9ca24, #f0932b)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>Rose Convent High School</div>
            <div style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.4)", letterSpacing: "0.16em", textTransform: "uppercase" }}>
              Student Records
            </div>
          </div>
        </div>

        {/* Search */}
        <div style={{ position: "relative", maxWidth: 420 }}>
          <span style={{
            position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)",
            fontSize: 16, color: "rgba(255,255,255,0.4)",
          }}>🔍</span>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by name, class, roll no..."
            style={{
              width: "100%", boxSizing: "border-box",
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: 10, padding: "10px 16px 10px 40px",
              color: "#fff", fontSize: "0.88rem",
              outline: "none",
              fontFamily: "inherit",
            }}
          />
        </div>
      </div>

      {/* ── COUNT BAR ── */}
      <div style={{
        background: "#fff", borderBottom: "1px solid #e2e8f0",
        padding: "12px 40px", display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <span style={{ fontSize: "0.82rem", color: "#64748b", fontWeight: 600 }}>
          Showing <span style={{ color: "#0f3460" }}>{filtered.length}</span> of <span style={{ color: "#0f3460" }}>{students.length}</span> students
        </span>
        <span style={{
          background: "#0f346015", color: "#0f3460",
          borderRadius: 20, padding: "3px 14px",
          fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.06em",
        }}>ACADEMIC YEAR 2024–25</span>
      </div>

      {/* ── TABLE ── */}
      <div style={{ padding: "28px 40px" }}>
        <div style={{
          background: "#fff",
          borderRadius: 16,
          boxShadow: "0 2px 16px rgba(0,0,0,0.08)",
          overflow: "hidden",
          border: "1px solid #e2e8f0",
        }}>
          {/* Table Head */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "60px 2fr 80px 80px 100px 100px 120px 110px",
            background: "linear-gradient(135deg, #1a1a2e, #0f3460)",
            padding: "14px 20px",
            gap: 8,
          }}>
            {["#", "Student Name", "Class", "Section", "Roll No", "Scholar No", "DOB", "Action"].map((h, i) => (
              <div key={i} style={{
                fontSize: "0.7rem", fontWeight: 700, color: "rgba(255,255,255,0.6)",
                letterSpacing: "0.1em", textTransform: "uppercase",
                textAlign: i === 7 ? "center" : "left",
              }}>{h}</div>
            ))}
          </div>

          {/* Rows */}
          {filtered.length === 0 ? (
            <div style={{ padding: "60px 20px", textAlign: "center", color: "#94a3b8", fontSize: "0.9rem" }}>
              No students found.
            </div>
          ) : (
            filtered.map((s, idx) => (
              <StudentRow
                key={s._id}
                student={s}
                idx={idx}
                color={getColor(s._id)}
                onDetail={() => setDetailStudent(s)}
                onEdit={() => openEdit(s)}
              />
            ))
          )}
        </div>
      </div>

      {/* ── DETAIL MODAL ── */}
      {detailStudent && (
        <Modal onClose={() => setDetailStudent(null)} wide={false}>
          <div style={{ padding: "32px 36px" }}>
            {/* Avatar */}
            <div style={{ display: "flex", alignItems: "center", gap: 18, marginBottom: 28 }}>
              <div style={{
                width: 64, height: 64, borderRadius: "50%",
                background: `linear-gradient(135deg, ${getColor(detailStudent._id)}, ${getColor(detailStudent._id)}88)`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "1.4rem", fontWeight: 700, color: "#fff",
                flexShrink: 0, boxShadow: `0 4px 20px ${getColor(detailStudent._id)}55`,
              }}>{getInitials(detailStudent.student_name)}</div>
              <div>
                <div style={{ fontSize: "1.3rem", fontWeight: 700, color: "#1a1a2e" }}>{detailStudent.student_name}</div>
                <div style={{ fontSize: "0.8rem", color: "#64748b", marginTop: 2 }}>
                  Class {detailStudent.class}{detailStudent.section} · Roll No {detailStudent.roll_number}
                </div>
              </div>
              <button
                onClick={() => { setDetailStudent(null); openEdit(detailStudent); }}
                style={{
                  marginLeft: "auto",
                  background: "linear-gradient(135deg, #f9ca24, #f0932b)",
                  border: "none", borderRadius: 10,
                  padding: "10px 22px", color: "#1a1a2e",
                  fontWeight: 700, fontSize: "0.82rem",
                  cursor: "pointer", letterSpacing: "0.06em",
                  display: "flex", alignItems: "center", gap: 6,
                }}>✏️ Edit</button>
            </div>

            {/* Detail grid */}
            <div style={{
              display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px 24px",
            }}>
              {FIELDS.filter(f => f.key !== "student_name").map(f => (
                <div key={f.key} style={{
                  background: "#f8fafc",
                  borderRadius: 10,
                  padding: "12px 16px",
                  border: "1px solid #e2e8f0",
                }}>
                  <div style={{ fontSize: "0.68rem", color: "#94a3b8", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 4 }}>
                    {f.label}
                  </div>
                  <div style={{ fontSize: "0.9rem", color: "#1e293b", fontWeight: 600, wordBreak: "break-all" }}>
                    {detailStudent[f.key as keyof Student] || "—"}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Modal>
      )}

      {/* ── EDIT MODAL ── */}
      {editStudent && (
        <Modal onClose={() => setEditStudent(null)} wide>
          <div style={{ padding: "32px 36px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 28 }}>
              <div style={{
                width: 42, height: 42, borderRadius: "50%",
                background: `linear-gradient(135deg, ${editForm._id ? getColor(editForm._id) : "#999"}, ${editForm._id ? getColor(editForm._id) + "88" : "#99988"})`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "1rem", fontWeight: 700, color: "#fff", flexShrink: 0,
              }}>{getInitials(editForm.student_name || "?")}</div>
              <div>
                <div style={{ fontSize: "1.15rem", fontWeight: 700, color: "#1a1a2e" }}>Edit Student</div>
                <div style={{ fontSize: "0.75rem", color: "#94a3b8" }}>Update student information below</div>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px 20px" }}>
              {FIELDS.map(f => (
                <div key={f.key} style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                  <label style={{
                    fontSize: "0.7rem", fontWeight: 700, color: "#64748b",
                    letterSpacing: "0.1em", textTransform: "uppercase",
                  }}>{f.label}</label>
                  <input
                    value={(editForm[f.key as keyof Student] as string) || ""}
                    onChange={e => setEditForm(prev => ({ ...prev, [f.key]: e.target.value }))}
                    style={{
                      border: "1.5px solid #e2e8f0",
                      borderRadius: 8, padding: "9px 13px",
                      fontSize: "0.88rem", color: "#1e293b",
                      outline: "none", fontFamily: "inherit",
                      transition: "border-color 0.2s",
                      background: "#fff",
                    }}
                    onFocus={e => e.target.style.borderColor = "#0f3460"}
                    onBlur={e => e.target.style.borderColor = "#e2e8f0"}
                  />
                </div>
              ))}
            </div>

            <div style={{ display: "flex", gap: 12, marginTop: 28, justifyContent: "flex-end" }}>
              <button
                onClick={() => setEditStudent(null)}
                style={{
                  background: "#f1f5f9", border: "none", borderRadius: 10,
                  padding: "11px 28px", color: "#64748b",
                  fontSize: "0.85rem", fontWeight: 600, cursor: "pointer",
                  fontFamily: "inherit",
                }}>Cancel</button>
              <button
                onClick={handleSave}
                style={{
                  background: saved
                    ? "linear-gradient(135deg, #6AB04C, #22A6B3)"
                    : "linear-gradient(135deg, #f9ca24, #f0932b)",
                  border: "none", borderRadius: 10,
                  padding: "11px 32px", color: "#1a1a2e",
                  fontSize: "0.85rem", fontWeight: 700, cursor: "pointer",
                  fontFamily: "inherit", letterSpacing: "0.04em",
                  transition: "all 0.3s",
                  minWidth: 130,
                }}>{saved ? "✅ Saved!" : "💾 Save Changes"}</button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

/* ── ROW COMPONENT ── */
function StudentRow({ student, idx, color, onDetail, onEdit }: { student: Student; idx: number; color: string; onDetail: () => void; onEdit: () => void }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "grid",
        gridTemplateColumns: "60px 2fr 80px 80px 100px 100px 120px 110px",
        padding: "14px 20px", gap: 8,
        alignItems: "center",
        borderBottom: "1px solid #f1f5f9",
        background: hovered ? "#f8fafc" : idx % 2 === 0 ? "#fff" : "#fafbfc",
        transition: "background 0.15s",
        cursor: "pointer",
      }}
    >
      {/* Index */}
      <div style={{ fontSize: "0.8rem", color: "#94a3b8", fontWeight: 600 }}>{idx + 1}</div>

      {/* Name + avatar */}
      <div onClick={onDetail} style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{
          width: 36, height: 36, borderRadius: "50%",
          background: `linear-gradient(135deg, ${color}, ${color}88)`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "0.75rem", fontWeight: 700, color: "#fff", flexShrink: 0,
        }}>
          {student.student_name.split(" ").slice(0, 2).map((n: string) => n[0]).join("").toUpperCase()}
        </div>
        <div>
          <div style={{ fontSize: "0.9rem", fontWeight: 700, color: "#1e293b" }}>{student.student_name}</div>
          <div style={{ fontSize: "0.7rem", color: "#94a3b8" }}>Scholar: {student.scholar_no}</div>
        </div>
      </div>

      {/* Class */}
      <div>
        <span style={{
          background: `${color}18`, color: color,
          borderRadius: 6, padding: "3px 10px",
          fontSize: "0.78rem", fontWeight: 700,
        }}>{student.class}</span>
      </div>

      {/* Section */}
      <div style={{ fontSize: "0.85rem", color: "#475569", fontWeight: 600 }}>{student.section || "—"}</div>

      {/* Roll */}
      <div style={{ fontSize: "0.85rem", color: "#475569" }}>{student.roll_number}</div>

      {/* Scholar */}
      <div style={{ fontSize: "0.85rem", color: "#475569" }}>{student.scholar_no}</div>

      {/* DOB */}
      <div style={{ fontSize: "0.8rem", color: "#64748b" }}>{student.dob}</div>

      {/* Actions */}
      <div style={{ display: "flex", gap: 6, justifyContent: "center" }}>
        <button onClick={onDetail} style={{
          background: "#eff6ff", border: "1px solid #bfdbfe",
          borderRadius: 7, padding: "5px 11px",
          color: "#1d4ed8", fontSize: "0.72rem", fontWeight: 700,
          cursor: "pointer", letterSpacing: "0.04em",
          transition: "all 0.15s",
        }}
          onMouseEnter={e => { e.currentTarget.style.background = "#1d4ed8"; e.currentTarget.style.color = "#fff"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "#eff6ff"; e.currentTarget.style.color = "#1d4ed8"; }}
        >👁 View</button>
        <button onClick={onEdit} style={{
          background: "#fffbeb", border: "1px solid #fde68a",
          borderRadius: 7, padding: "5px 11px",
          color: "#b45309", fontSize: "0.72rem", fontWeight: 700,
          cursor: "pointer", letterSpacing: "0.04em",
          transition: "all 0.15s",
        }}
          onMouseEnter={e => { e.currentTarget.style.background = "#f59e0b"; e.currentTarget.style.color = "#fff"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "#fffbeb"; e.currentTarget.style.color = "#b45309"; }}
        >✏️ Edit</button>
        <button onClick={() => marksheetredirect(student._id)} style={{
          background: "#e8f5ff", border: "1px solid #93c5fd",
          borderRadius: 7, padding: "5px 11px",
          color: "#0c4a6e", fontSize: "0.72rem", fontWeight: 700,
          cursor: "pointer", letterSpacing: "0.04em",
          transition: "all 0.15s",
        }}
          onMouseEnter={e => { e.currentTarget.style.background = "#0ea5e9"; e.currentTarget.style.color = "#fff"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "#e8f5ff"; e.currentTarget.style.color = "#0c4a6e"; }}
        >🧾 Marksheet</button>
      </div>
    </div>
  );
}

/* ── MODAL WRAPPER ── */
interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
  wide: boolean;
}

function Modal({ children, onClose, wide }: ModalProps) {
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 1000,
        background: "rgba(15,20,40,0.6)", backdropFilter: "blur(6px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: 24,
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: "#fff",
          borderRadius: 18,
          boxShadow: "0 24px 80px rgba(0,0,0,0.25)",
          width: "100%",
          maxWidth: wide ? 780 : 640,
          maxHeight: "88vh",
          overflowY: "auto",
          position: "relative",
          animation: "slideUp 0.22s ease",
        }}
      >
        {/* Close btn */}
        <button
          onClick={onClose}
          style={{
            position: "absolute", top: 16, right: 16,
            background: "#f1f5f9", border: "none", borderRadius: "50%",
            width: 32, height: 32, cursor: "pointer",
            fontSize: "1rem", color: "#64748b",
            display: "flex", alignItems: "center", justifyContent: "center",
            zIndex: 10,
          }}>✕</button>
        {children}
      </div>
      <style>{`@keyframes slideUp { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }`}</style>
    </div>
  );
}