import { createSlice } from '@reduxjs/toolkit'

const sclice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    setFilter(state, action) {
      return action.payload
    }
  },
})

export const { setFilter } = sclice.actions
export default sclice.reducer