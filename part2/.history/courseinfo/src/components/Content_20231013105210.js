import Part from './Part'

const Content = ({ parts }) => {
  const total = parts.reduce((sum,part) => sum + part.exercises,0)

  return (
    <div>
      {parts.map(part => {
        return <Part key={part.id} part={part} />
      })}
      <p>
        <b>total of {total} exercises</b>
      </p>
    </div>
  )
}

export default Content
