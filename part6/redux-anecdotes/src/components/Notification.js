const notificationAtStart = null

const initialState = notificationAtStart

const notificationReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'vote':
      state = `you voted '${action.data}'`
      break
    case 'create':
      state = action.data
      break
    case 'hide':
      state = null
      break
    default:
      break
  }
  return state
}

export const voteNotification = (content) => {
  return {
    type: 'vote',
    data: content
  }
}

export const createNotification = (content) => {
  return {
    type: 'create',
    data: content
  }
}

export const hideNotification = () => {
  return {
    type: 'hide'
  }
}

export default notificationReducer