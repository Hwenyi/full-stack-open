import { Props } from "../types";
import { CoursePart } from "../types";
import { assertNever } from "../types";

const Part = ({ part }: { part: CoursePart }) => {
  let details = null;
  switch (part.kind) {
    case "basic":
      details = <i>{part.description}</i>
      break;
    case "group":
      details = <p> project exercises: {part.groupProjectCount}</p>
      break;
    case "background":
      details = (
        <>
          <i>{part.description}</i>
          <p>for more info see {part.backroundMaterial}</p>
        </>
      )
      break;
    case "special":
      details = (
        <>
            <i>{part.description}</i>
            <p>required skills: {part.requirements.join(', ')}</p>
        </>
      )
      break;
    default:
      return assertNever(part);
  }

  return (
    <div>
      <h4>{part.name} (exercises {part.exerciseCount})</h4>
      <>{details}</>
    </div>
  )
}

const Content = ({ parts }: Props) => {
  return (
    <>
      {parts.map(part => <Part key={part.name} part={part}/> )}
    </>
  )
};

export default Content;