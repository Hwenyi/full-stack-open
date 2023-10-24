import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'


const Anecdotes = () => {
  const anecdotesToShow = useSelector(({ filter, anecdotes }) => {
    const byVotes = (a1, a2) => a2.votes - a1.votes
    const bySearched = (anecdote) => {
      if ( filter.length===0) {
        return true
      }
  
      return anecdote.content.toLowerCase().includes(filter.toLowerCase())
    }
    
    return anecdotes.filter(bySearched).sort(byVotes) 
  })

  const dispatch = useDispatch()

  const handleVote = (anecdote) => {
    dispatch(voteAnecdote(anecdote))
    dispatch(setNotification(`anecdote ${anecdote.content} voted`, 5))
  }

  return (
    <div>
      {anecdotesToShow.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Anecdotes