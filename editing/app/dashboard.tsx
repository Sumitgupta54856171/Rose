'use client'
import { useState } from "react";
import Link from "next/link";

const classes = [
  { id: 1, no:"1",name: "Class 1", students: 42, sections: ["A", "B"], color: "#FF6B6B" },
  { id: 2, no:"2", name: "Class 2", students: 38, sections: ["A", "B"], color: "#FF9F43" },
  { id: 3, no:"3", name: "Class 3", students: 45, sections: ["A", "B", "C"], color: "#F9CA24" },
  { id: 4, no:"4", name: "Class 4", students: 40, sections: ["A", "B"], color: "#6AB04C" },
  { id: 5, no:"UKG", name: "UKG", students: 36, sections: ["A", "B"], color: "#22A6B3" },
  { id: 6, no:"6", name: "Class 6", students: 44, sections: ["A", "B", "C"], color: "#4834D4" },
  { id: 7, no:"7", name: "Class 7", students: 39, sections: ["A", "B"], color: "#BE2EDD" },
  { id: 8, no:"LKG", name: "LKG", students: 41, sections: ["A", "B"], color: "#E84393" },
  { id: 9, no:"9", name: "Class 9", students: 37, sections: ["A", "B", "C"], color: "#1289A7" },
  { id: 10, no:"Nursery", name:"Nursery", students: 43, sections: ["A", "B", "C"], color: "#D63031" },
  { id: 11, no:"11", name: "Class 11", students: 35, sections: ["Science", "Commerce"], color: "#00B894" },
  { id: 12, no:"12", name: "Class 12", students: 33, sections: ["Science", "Commerce"], color: "#6C5CE7" },
];

const stats = [
  { label: "Total Students", value: "453", icon: "👨‍🎓" },
  { label: "Total Classes", value: "12", icon: "🏫" },
  { label: "Teachers", value: "28", icon: "👩‍🏫" },
  { label: "Pass Rate", value: "96%", icon: "🏆" },
];

export default function SchoolDashboard() {
  const [activeClass, setActiveClass] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #0f0c29, #302b63, #24243e)",
      fontFamily: "'Georgia', serif",
      color: "#fff",
      display: "flex",
      flexDirection: "column",
    }}>

      {/* ── TOP HEADER ── */}
      <header style={{
        background: "rgba(255,255,255,0.04)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(255,255,255,0.1)",
        padding: "0 40px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        minHeight: "90px",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}>
        {/* Left: Logo + Name */}
        <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
          <div style={{
            width: 56, height: 56, borderRadius: "50%",
            background: "linear-gradient(135deg, #f9ca24, #f0932b)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 26, boxShadow: "0 4px 20px rgba(249,202,36,0.4)",
            flexShrink: 0,
          }}>🌹</div>
          <div>
            <div style={{
              fontSize: "1.55rem", fontWeight: "700", letterSpacing: "0.04em",
              background: "linear-gradient(90deg, #f9ca24, #f0932b, #ff6b6b)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              lineHeight: 1.1,
            }}>
              Rose Convent High School
            </div>
            <div style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.45)", letterSpacing: "0.18em", textTransform: "uppercase", marginTop: 2 }}>
              Excellence · Discipline · Knowledge
            </div>
          </div>
        </div>

        {/* Right: nav */}
        <nav style={{ display: "flex", gap: "8px" }}>
          {["Dashboard", "Students", "Attendance", "Reports"].map((item, i) => (
            <button key={item} style={{
              background: i === 0 ? "linear-gradient(135deg, #f9ca24, #f0932b)" : "rgba(255,255,255,0.07)",
              border: "none", borderRadius: "8px",
              padding: "8px 18px", color: i === 0 ? "#1a1a2e" : "rgba(255,255,255,0.7)",
              fontSize: "0.82rem", fontWeight: i === 0 ? "700" : "400",
              cursor: "pointer", letterSpacing: "0.04em",
              transition: "all 0.2s",
            }}>{item}</button>
          ))}
        </nav>
      </header>

      {/* ── MAIN CONTENT ── */}
      <main style={{ flex: 1, padding: "36px 40px 0" }}>

        {/* Stats Row */}
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "18px", marginBottom: "36px",
        }}>
          {stats.map((s, i) => (
            <div key={i} style={{
              background: "rgba(255,255,255,0.06)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "16px", padding: "22px 24px",
              display: "flex", alignItems: "center", gap: "16px",
              transition: "transform 0.2s, box-shadow 0.2s",
              cursor: "default",
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 12px 40px rgba(0,0,0,0.3)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
            >
              <div style={{
                width: 50, height: 50, borderRadius: "12px",
                background: "rgba(249,202,36,0.15)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 24, flexShrink: 0,
              }}>{s.icon}</div>
              <div>
                <div style={{ fontSize: "1.6rem", fontWeight: "700", color: "#f9ca24", lineHeight: 1 }}>{s.value}</div>
                <div style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.5)", marginTop: 4, letterSpacing: "0.05em" }}>{s.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Section Title */}
        <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "22px" }}>
          <div style={{
            width: 5, height: 28, borderRadius: 3,
            background: "linear-gradient(180deg, #f9ca24, #f0932b)",
          }} />
          <h2 style={{ margin: 0, fontSize: "1.15rem", fontWeight: "600", letterSpacing: "0.06em", textTransform: "uppercase", color: "rgba(255,255,255,0.85)" }}>
            Class Overview
          </h2>
        </div>

        {/* Class Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "18px",
        }}>
          {classes.map((cls) => (
            <div
              key={cls.id}
              onClick={() => setActiveClass(activeClass?.id === cls.id ? null : cls)}
              onMouseEnter={() => setHoveredCard(cls.id)}
              onMouseLeave={() => setHoveredCard(null)}
              style={{
                background: activeClass?.id === cls.id
                  ? `linear-gradient(135deg, ${cls.color}33, ${cls.color}18)`
                  : "rgba(255,255,255,0.05)",
                backdropFilter: "blur(12px)",
                border: `1.5px solid ${activeClass?.id === cls.id ? cls.color : hoveredCard === cls.id ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.08)"}`,
                borderRadius: "16px",
                padding: "22px 20px",
                cursor: "pointer",
                transition: "all 0.25s",
                transform: hoveredCard === cls.id ? "translateY(-4px)" : "translateY(0)",
                boxShadow: hoveredCard === cls.id ? `0 16px 40px rgba(0,0,0,0.35)` : "none",
                position: "relative", overflow: "hidden",
              }}
            >
              {/* color accent bar top */}
              <div style={{
                position: "absolute", top: 0, left: 0, right: 0,
                height: "3px",
                background: `linear-gradient(90deg, ${cls.color}, transparent)`,
                borderRadius: "16px 16px 0 0",
              }} />

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "14px" }}>
                <div style={{
                  fontSize: "1.25rem", fontWeight: "700", color: "#fff",
                }}>{cls.name}</div>
                <div style={{
                  background: `${cls.color}30`,
                  border: `1px solid ${cls.color}60`,
                  color: cls.color,
                  borderRadius: "8px",
                  padding: "3px 10px",
                  fontSize: "0.7rem",
                  fontWeight: "600",
                  letterSpacing: "0.05em",
                }}>{cls.students} Students</div>
              </div>

              {/* Sections */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                {cls.sections.map(sec => (
                  <span key={sec} style={{
                    background: "rgba(255,255,255,0.08)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    borderRadius: "6px",
                    padding: "4px 10px",
                    fontSize: "0.72rem",
                    color: "rgba(255,255,255,0.7)",
                    letterSpacing: "0.04em",
                  }}>Section {sec}</span>
                ))}
              </div>

              {/* Expanded detail */}
              {activeClass?.id === cls.id && (
                <div style={{
                  marginTop: "16px",
                  paddingTop: "14px",
                  borderTop: `1px solid ${cls.color}40`,
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                    <span style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.5)" }}>Sections</span>
                    <span style={{ fontSize: "0.75rem", color: cls.color, fontWeight: "600" }}>{cls.sections.length}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.5)" }}>Avg per Section</span>
                    <span style={{ fontSize: "0.75rem", color: cls.color, fontWeight: "600" }}>
                      {Math.round(cls.students / cls.sections.length)}
                    </span>
                  </div>
                  <button style={{
                    marginTop: "12px", width: "100%",
                    background: `linear-gradient(135deg, ${cls.color}, ${cls.color}aa)`,
                    border: "none", borderRadius: "8px",
                    padding: "8px", color: "#fff",
                    fontSize: "0.75rem", fontWeight: "600",
                    cursor: "pointer", letterSpacing: "0.06em",
                  }}><Link href={`/students?class=${cls.no}`}>VIEW STUDENTS →</Link></button>
                </div>
              )}
            </div>
          ))}
        </div>
      </main>

      {/* ── BOTTOM FOOTER ── */}
      <footer style={{
        marginTop: "40px",
        background: "rgba(0,0,0,0.35)",
        backdropFilter: "blur(20px)",
        borderTop: "1px solid rgba(255,255,255,0.08)",
        padding: "0 40px",
      }}>
        {/* Class name strip */}
        <div style={{
          display: "flex",
          overflowX: "auto",
          gap: "0",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          scrollbarWidth: "none",
        }}>
          {classes.map((cls) => (
            <div
              key={cls.id}
              onClick={() => setActiveClass(activeClass?.id === cls.id ? null : cls)}
              style={{
                padding: "14px 22px",
                cursor: "pointer",
                borderBottom: activeClass?.id === cls.id ? `3px solid ${cls.color}` : "3px solid transparent",
                color: activeClass?.id === cls.id ? cls.color : "rgba(255,255,255,0.45)",
                fontSize: "0.8rem",
                fontWeight: activeClass?.id === cls.id ? "700" : "400",
                letterSpacing: "0.06em",
                whiteSpace: "nowrap",
                transition: "all 0.2s",
                textTransform: "uppercase",
              }}
              onMouseEnter={e => { if (activeClass?.id !== cls.id) e.currentTarget.style.color = "rgba(255,255,255,0.8)"; }}
              onMouseLeave={e => { if (activeClass?.id !== cls.id) e.currentTarget.style.color = "rgba(255,255,255,0.45)"; }}
            >
              {cls.name}
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          padding: "14px 0",
        }}>
          <div style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.3)", letterSpacing: "0.1em" }}>
            © 2025 Rose Convent High School · All Rights Reserved
          </div>
          <div style={{
            fontSize: "0.72rem", color: "rgba(255,255,255,0.3)",
            display: "flex", gap: "20px",
          }}>
            <span>Academic Year 2024–25</span>
            <span style={{ color: "#f9ca2460" }}>|</span>
            <span>Admin Portal v1.0</span>
          </div>
        </div>
      </footer>
    </div>
  );
}