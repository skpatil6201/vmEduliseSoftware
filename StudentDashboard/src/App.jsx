import { useState } from 'react'
import './App.css'
import StudentCard from './components/StudentCard'

const studentData = [
  {
    id: 1,
    name: "Raj",
    department: "Computer",
    semesters: [
      {
        sem: 1,
        subjects: [
          { name: "Math", mark: 70 },
          { name: "Physics", mark: 82 },
          { name: "Programming", mark: 90 },
        ],
      },
      {
        sem: 2,
        subjects: [
          { name: "Data Structures", mark: 85 },
          { name: "DBMS", mark: 78 },
          { name: "OS", mark: 88 },
        ],
      },
    ],
  },
  {
    id: 2,
    name: "Simran",
    department: "IT",
    semesters: [
      {
        sem: 1,
        subjects: [
          { name: "Math", mark: 60 },
          { name: "Physics", mark: 75 },
          { name: "Programming", mark: 95 },
        ],
      },
      {
        sem: 2,
        subjects: [
          { name: "DBMS", mark: 80 },
          { name: "OS", mark: 72 },
          { name: "Java", mark: 91 },
        ],
      },
    ],
  },
]

function App() {
  const [filter, setFilter] = useState('all')
  const [bonus, setBonus] = useState(0)
  const minMark = filter === 'all' ? 0 : parseInt(filter.replace('above', ''))

  const filteredData = studentData.map((student) => ({
    ...student,
    semesters: student.semesters.map((sem) => ({
      ...sem,
      subjects: sem.subjects
        .map((s) => ({ ...s, mark: s.mark + bonus }))
        .filter((s) => s.mark > minMark),
    })),
  }))

  const topStudents = studentData
    .map((s) => {
      const semAvgs = s.semesters.map((sem) =>
        Math.round(sem.subjects.reduce((sum, sub) => sum + sub.mark + bonus, 0) / sem.subjects.length)
      )
      const avg = Math.round(semAvgs.reduce((a, b) => a + b, 0) / semAvgs.length)
      return { name: s.name, avg }
    })
    .sort((a, b) => b.avg - a.avg)
    .slice(0, 1)

  return (
    <div className="page">
      <h1 className="title">Student Performance Dashboard</h1>

      <div className="top-banner">
       <strong>Top Performer:</strong>{' '}
        {topStudents.map((s) => (
          <span key={s.name}>{s.name} — {s.avg}%</span>
        ))}
      </div>

      <div className="filter-bar">
        <label>Filter:</label>
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All Subjects</option>
          <option value="above80">Above 80</option>
          <option value="above90">Above 90</option>
        </select>

        {bonus === 0 ? (
          <button className="grace-btn" onClick={() => setBonus(5)}>+5 Grace</button>
        ) : (
          <>
            <button className="reset-btn" onClick={() => setBonus(0)}>Reset</button>
            <span className="grace-note">All subject mark increased by 5 Mark</span>
          </>
        )}
      </div>

      <div className="grid">
        {filteredData.map((student) => (
          <StudentCard key={student.id} student={student} bonus={bonus} />
        ))}
      </div>
    </div>
  )
}

export default App
