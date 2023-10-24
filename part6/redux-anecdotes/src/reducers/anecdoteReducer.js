import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdoteService'

const sclice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    vote(state, action) {
      const id = action.payload
      const toVote = state.find(s => s.id === id )
      const voted = { ...toVote, votes: toVote.votes + 1 }
      return state.map(s => s.id===id ? voted : s)
    },
    replaceAnecdote(state, action) {
      const replaced = action.payload
      return state.map(s => s.id===replaced.id ? replaced : s)
    },
    addAnecdote(state, action) {
      return state.concat(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  },
})

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (object) => {
  return async dispatch => {
    const anecdote = await anecdoteService.createNew(object)
    dispatch(addAnecdote(anecdote))
  }
}

export const voteAnecdote = (object) => {
  const toVote = { ...object, votes: object.votes + 1 }
  return async dispatch => {
    const anecdote = await anecdoteService.update(toVote)
    dispatch(replaceAnecdote(anecdote))
  }
}

export const { addAnecdote, replaceAnecdote, setAnecdotes } = sclice.actions
export default sclice.reducer