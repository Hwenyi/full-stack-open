import { configureStore } from "@reduxjs/toolkit";
import anecdoteReducer from "./reducers/anecdoteReducer";
import notificationReducer from "./reducers/notificationReducer";




export default configureStore({
  reducer: {
    anecdotes: anecdoteReducer,
    notification: notificationReducer,
  }
})