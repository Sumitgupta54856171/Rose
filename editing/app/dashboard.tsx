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
  const [activeClass, setActiveClass] = useState<any>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <div style={{
      minHeight: "100vh",
      background: "#ffffff",
      fontFamily: "'Segoe UI', 'Roboto', sans-serif",
      color: "#1a1a1a",
      display: "flex",
      flexDirection: "column",
    }}>

      {/* ── TOP HEADER ── */}
      <header style={{
        background: "#ffffff",
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        borderBottom: "1px solid #e5e5e5",
        padding: "1rem 1.5rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        minHeight: "auto",
        position: "sticky",
        top: 0,
        zIndex: 100,
        flexWrap: "wrap",
        gap: "1rem",
      }}>
        {/* Left: Logo + Name */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px", flex: 1, minWidth: 0 }}>
          <div style={{
            width: 48, height: 48, borderRadius: "50%",
            background: "linear-gradient(135deg, #f9ca24, #f0932b)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "1.5rem", boxShadow: "0 2px 8px rgba(249,202,36,0.2)",
            flexShrink: 0,
          }}>🌹</div>
          <div style={{ minWidth: 0 }}>
            <div style={{
              fontSize: "clamp(1rem, 4vw, 1.4rem)", fontWeight: "700", letterSpacing: "0.02em",
              background: "linear-gradient(90deg, #f9ca24, #f0932b, #ff6b6b)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              lineHeight: 1.2,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}>
              Rose Convent High School
            </div>
            <div style={{ fontSize: "0.65rem", color: "#666666", letterSpacing: "0.08em", textTransform: "uppercase", marginTop: 2, whiteSpace: "nowrap" }}>
              Excellence · Discipline · Knowledge
            </div>
          </div>
        </div>

        {/* Right: nav */}
        <nav style={{ 
          display: "flex", 
          gap: "8px",
          flexWrap: "wrap",
          justifyContent: "flex-end",
        }}>
          {["Dashboard", "Students", "Attendance", "Reports"].map((item, i) => (
            <button key={item} style={{
              background: i === 0 ? "linear-gradient(135deg, #f9ca24, #f0932b)" : "#f5f5f5",
              border: "none", borderRadius: "8px",
              padding: "8px 14px", color: i === 0 ? "#1a1a1a" : "#333333",
              fontSize: "clamp(0.7rem, 2vw, 0.82rem)", fontWeight: i === 0 ? "700" : "500",
              cursor: "pointer", letterSpacing: "0.02em",
              transition: "all 0.2s",
              whiteSpace: "nowrap",
            }}
            onMouseEnter={e => { if (i !== 0) e.currentTarget.style.background = "#eeeeee"; }}
            onMouseLeave={e => { if (i !== 0) e.currentTarget.style.background = "#f5f5f5"; }}
            >{item}</button>
          ))}
        </nav>
      </header>

      {/* ── MAIN CONTENT ── */}
      <main style={{ flex: 1, padding: "clamp(1rem, 4vw, 2rem)", paddingBottom: 0 }}>

        {/* Stats Row */}
        <div style={{
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", 
          gap: "1rem", 
          marginBottom: "2rem",
        }}>
          {stats.map((s, i) => (
            <div key={i} style={{
              background: "#ffffff",
              boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
              border: "1px solid #e8e8e8",
              borderRadius: "12px", 
              padding: "1.5rem",
              display: "flex", 
              alignItems: "center", 
              gap: "1rem",
              transition: "transform 0.2s, box-shadow 0.2s",
              cursor: "default",
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.08)"; }}
            >
              <div style={{
                width: 50, height: 50, borderRadius: "10px",
                background: "#f0f0f0",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "1.8rem", flexShrink: 0,
              }}>{s.icon}</div>
              <div>
                <div style={{ fontSize: "clamp(1.2rem, 3vw, 1.5rem)", fontWeight: "700", color: "#f9ca24", lineHeight: 1 }}>{s.value}</div>
                <div style={{ fontSize: "0.75rem", color: "#666666", marginTop: 4, letterSpacing: "0.03em" }}>{s.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Section Title */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "1.5rem" }}>
          <div style={{
            width: 4, height: 24, borderRadius: 2,
            background: "linear-gradient(180deg, #f9ca24, #f0932b)",
          }} />
          <h2 style={{ margin: 0, fontSize: "clamp(1rem, 3vw, 1.15rem)", fontWeight: "700", letterSpacing: "0.04em", textTransform: "uppercase", color: "#1a1a1a" }}>
            Class Overview
          </h2>
        </div>

        {/* Class Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "1.5rem",
          marginBottom: "2rem",
        }}>
          {classes.map((cls) => (
            <div
              key={cls.id}
              onClick={() => setActiveClass(activeClass?.id === cls.id ? null : cls)}
              onMouseEnter={() => setHoveredCard(cls.id)}
              onMouseLeave={() => setHoveredCard(null)}
              style={{
                background: "#ffffff",
                boxShadow: activeClass?.id === cls.id
                  ? "0 8px 24px rgba(0,0,0,0.12)"
                  : "0 1px 3px rgba(0,0,0,0.08)",
                border: `1.5px solid ${activeClass?.id === cls.id ? cls.color : hoveredCard === cls.id ? "#d0d0d0" : "#e8e8e8"}`,
                borderRadius: "12px",
                padding: "1.5rem",
                cursor: "pointer",
                transition: "all 0.25s",
                transform: hoveredCard === cls.id ? "translateY(-4px)" : "translateY(0)",
                position: "relative", 
                overflow: "hidden",
              }}
            >
              {/* color accent bar top */}
              <div style={{
                position: "absolute", top: 0, left: 0, right: 0,
                height: "3px",
                background: `linear-gradient(90deg, ${cls.color}, transparent)`,
                borderRadius: "12px 12px 0 0",
              }} />

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
                <div style={{
                  fontSize: "clamp(1rem, 3vw, 1.2rem)", fontWeight: "700", color: "#1a1a1a",
                }}>{cls.name}</div>
                <div style={{
                  background: `${cls.color}15`,
                  border: `1.5px solid ${cls.color}40`,
                  color: cls.color,
                  borderRadius: "8px",
                  padding: "4px 10px",
                  fontSize: "0.7rem",
                  fontWeight: "600",
                  letterSpacing: "0.02em",
                  whiteSpace: "nowrap",
                }}>{cls.students} Students</div>
              </div>

              {/* Sections */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                {cls.sections.map(sec => (
                  <span key={sec} style={{
                    background: "#f5f5f5",
                    border: "1px solid #ddd",
                    borderRadius: "6px",
                    padding: "4px 10px",
                    fontSize: "0.7rem",
                    color: "#555",
                    letterSpacing: "0.02em",
                  }}>Section {sec}</span>
                ))}
              </div>

              {/* Expanded detail */}
              {activeClass?.id === cls.id && (
                <div style={{
                  marginTop: "1rem",
                  paddingTop: "1rem",
                  borderTop: `1px solid ${cls.color}30`,
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                    <span style={{ fontSize: "0.75rem", color: "#666" }}>Sections</span>
                    <span style={{ fontSize: "0.75rem", color: cls.color, fontWeight: "700" }}>{cls.sections.length}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
                    <span style={{ fontSize: "0.75rem", color: "#666" }}>Avg per Section</span>
                    <span style={{ fontSize: "0.75rem", color: cls.color, fontWeight: "700" }}>
                      {Math.round(cls.students / cls.sections.length)}
                    </span>
                  </div>
                  <button style={{
                    width: "100%",
                    background: `linear-gradient(135deg, ${cls.color}, ${cls.color}cc)`,
                    border: "none", borderRadius: "8px",
                    padding: "10px", color: "#fff",
                    fontSize: "0.75rem", fontWeight: "600",
                    cursor: "pointer", letterSpacing: "0.04em",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={e => e.currentTarget.style.transform = "scale(1.02)"}
                  onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
                  ><Link href={`/Studentlist/${cls.no}`} style={{ textDecoration: "none", color: "#fff" }}>VIEW STUDENTS →</Link></button>
                </div>
              )}
            </div>
          ))}
        </div>
      </main>

      {/* ── BOTTOM FOOTER ── */}
      <footer style={{
        marginTop: "auto",
        background: "#f8f8f8",
        boxShadow: "0 -2px 8px rgba(0,0,0,0.04)",
        borderTop: "1px solid #e5e5e5",
        padding: "1rem",
      }}>
        {/* Class name strip */}
        <div style={{
          display: "flex",
          overflowX: "auto",
          gap: "0",
          borderBottom: "1px solid #e5e5e5",
          scrollbarWidth: "none",
          marginBottom: "1rem",
          WebkitOverflowScrolling: "touch",
        }}>
          {classes.map((cls) => (
            <div
              key={cls.id}
              onClick={() => setActiveClass(activeClass?.id === cls.id ? null : cls)}
              style={{
                padding: "12px 16px",
                cursor: "pointer",
                borderBottom: activeClass?.id === cls.id ? `3px solid ${cls.color}` : "3px solid transparent",
                color: activeClass?.id === cls.id ? cls.color : "#999",
                fontSize: "0.75rem",
                fontWeight: activeClass?.id === cls.id ? "700" : "400",
                letterSpacing: "0.03em",
                whiteSpace: "nowrap",
                transition: "all 0.2s",
                textTransform: "uppercase",
              }}
              onMouseEnter={e => { if (activeClass?.id !== cls.id) e.currentTarget.style.color = "#333"; }}
              onMouseLeave={e => { if (activeClass?.id !== cls.id) e.currentTarget.style.color = "#999"; }}
            >
              {cls.name}
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div style={{
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "center",
          padding: "0.75rem 1rem",
          flexWrap: "wrap",
          gap: "1rem",
        }}>
          <div style={{ fontSize: "0.7rem", color: "#999", letterSpacing: "0.05em" }}>
            © 2025 Rose Convent High School · All Rights Reserved
          </div>
          <div style={{
            fontSize: "0.7rem", color: "#999",
            display: "flex", gap: "12px",
            flexWrap: "wrap",
            justifyContent: "center",
          }}>
            <span>Academic Year 2024–25</span>
            <span style={{ color: "#ddd" }}>|</span>
            <span>Admin Portal v1.0</span>
          </div>
        </div>
      </footer>
    </div>
  );
}