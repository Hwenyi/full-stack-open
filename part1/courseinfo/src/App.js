const Header = (props) => {
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  );
}

const Content = (props) => {
  return (
    <Part name={props.name} exercises={props.exercises} />
  );
}

const Total = (props) => {
  return (
    <div>
      <p>Number of exercises {props.exercises}</p>
    </div>
  );
}

const Part = (props) => {
  return (
    <div>
      <p>{props.name} {props.exercises}</p>
    </div>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
      },
      {
        name: 'State of a component',
        exercises: 14,
      },
    ],
  };

  return (
    <div>
      <Header course={course.name} />
      {course.parts.map((part, index) => (
        <Content
          key={index}
          name={part.name}
          exercises={part.exercises}
        />
      ))}
      <Total exercises={course.parts.reduce((sum, part) => sum + part.exercises, 0)} />
    </div>
  );
}

export default App;




