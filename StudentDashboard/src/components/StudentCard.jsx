import SemesterBlock from './SemesterBlock'

function StudentCard({ student, bonus = 0 }) {
  const semAvgs = student.semesters.map((sem) =>
    sem.subjects.length > 0
      ? Math.round(sem.subjects.reduce((sum, s) => sum + s.mark, 0) / sem.subjects.length)
      : 0
  )
  const overallAvg = Math.round(semAvgs.reduce((a, b) => a + b, 0) / semAvgs.length)

  return (
    <div className="card">
      <div className="card-header">
        <div>
          <h2>{student.name}   <span className="badge">{student.department}</span>
        </h2>
        </div>
      </div>

      <div className="sems">
        {student.semesters.map((sem) => (
          <SemesterBlock key={sem.sem} semester={sem} bonus={bonus} />
        ))}
      </div>

      <div className="card-footer">
        <span>Overall Average</span>
        <span className="avg-score">{overallAvg}%</span>
      </div>
    </div>
  )
}

export default StudentCard
