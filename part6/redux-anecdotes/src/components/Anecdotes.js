import { useDispatch, useSelector } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import {
  voteNotification,
  createNotification,
  hideNotification
} from './Notification'


const Anecdote = ({ anecdote, handleClick }) => {
  return(
    <li>
      {anecdote.content}
      <br />
      <span>has {anecdote.votes} votes {' '}</span>
      <button onClick={handleClick}>vote</button>
    </li>
  )
}

const Anecdotes = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state)
  const voteAnecdote = (id) => {
    dispatch(vote(id))
  }
  return(
    <ul>
      {anecdotes.map(anecdote =>
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => voteAnecdote(anecdote.id)}
        />
      )}
    </ul>
  )
}

export default Anecdotes