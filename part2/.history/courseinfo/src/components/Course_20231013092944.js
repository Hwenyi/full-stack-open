
import Header from './Header'
import Content from './Content'

const Course = ({ courses }) => {
  return (
    courses.map(course =>
      <div key={course.id}>
        <Header name={course.name} />
        <Content parts={course.parts} />
      </div>)
  )
}

export default Course