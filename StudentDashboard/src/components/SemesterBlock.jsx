import SubjectRow from './SubjectRow'


function SemesterBlock({ semester, bonus = 0 }) {
 

  return (
    <div className="sem">
      <div className="semtitle">
        <span>Sem {semester.sem}</span>
        <p></p>
      </div>

        {semester.subjects.length > 0
          ? semester.subjects.map((sub) => <SubjectRow key={sub.name} subject={sub} bonus={bonus} />)
          : <div className="no-subjects">No subjects match</div>
        }
    
    </div>
  )
}

export default SemesterBlock
