import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]

  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(new Uint8Array(7))
  const [most,setMost] = useState(0)

  const handleClick = () => {
    const random = Math.floor(Math.random() * anecdotes.length)
    setSelected(random)
  }
  //创建一个按钮用于给每个名言投票
  const handleVote = () => {
    const copy = [...points]
    copy[selected] += 1
    //遍历copy数组，求出最大的元素的下标
    let max = 0
    for(let i = 0;i < copy.length;i++){
      if(copy[i] > copy[max]){
        max = i
      }
    }
    setMost(max)
    setPoints(copy)
  }
  

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
      <br/>
      has {points[selected]} votes
      <br/>
      <Button text='vote' onClick={handleVote}/>
      <Button text='next anecdote' onClick={handleClick}/>
      <h1>Anecdote with most votes</h1>
      {anecdotes[most]}
      <br/>
      has {points[most]} votes
    </div>
  )
}

//创建button随机选择anecdotes
const Button = (props) => {
  return (
    <button onClick={props.onClick}>
      {props.text}
    </button>
  )
}


export default App