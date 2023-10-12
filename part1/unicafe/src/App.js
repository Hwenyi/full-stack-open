import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  //good+1
  const handleGoodClick = () => {
    setGood(good + 1)
  }
  //neutral+1
  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  }
  //bad+1 
  const handleBadClick = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button text='good' onClick={handleGoodClick}/>
      <Button text='neutral' onClick={handleNeutralClick}/>
      <Button text='bad' onClick={handleBadClick}/>
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

const Button = (props) => {
  return (
    <button onClick={props.onClick}>
      {props.text}
    </button>
  )
}


const StatisticLine = props => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  )
}

const Statistics = props => {
  const all = props.good + props.neutral + props.bad
  const average = props.good - props.bad
  const positive = (props.good / all) * 100

  if (all > 0) {
    return (
      <table>
        <tbody>
          <StatisticLine text='good' value={props.good} />
          <StatisticLine text='neutral' value={props.neutral} />
          <StatisticLine text='bad' value={props.bad} />
          <StatisticLine text='all' value={all} />
          <StatisticLine text='average' value={average} />
          <StatisticPositiveLine text='positive' value={positive} />
        </tbody>
      </table>
    )
  } else {
    return <span>No feedback given</span>
  }
}

const StatisticPositiveLine = props => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value} %</td>
    </tr>
  )
}

export default App