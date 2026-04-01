function SubjectRow({ subject, bonus = 0 }) {
  const isHigh = subject.mark > 85

  return (
    <div className={`subject-row${isHigh ? ' high' : ''}`}>
      <span>{subject.name}</span>
      <span>
        {bonus > 0
          ? <span title={`Original: ${subject.mark - bonus}`}>{subject.mark}</span>
          : subject.mark
        }
      </span>
    </div>
  )
}

export default SubjectRow
