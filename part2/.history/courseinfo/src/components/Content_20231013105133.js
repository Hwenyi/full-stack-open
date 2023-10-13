import Part from './Part'

const Content = ({ parts }) => {
  const tottal = parts.reduce((sum,part) => sum + part.exercises,0)

  return (
    <div>
      {parts.map(part => {
        return <Part key={part.id} part={part} />
      })}
      
    </div>
  )
}

export default Content
