import socketIo from 'socket.io'
import { createStore } from 'redux'
import { createSelector } from 'reselect'

const initialState = 0

function reducer (state = initialState, action) {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1
    case 'DECREMENT':
      return state - 1
    default:
      return state
  }
}

function render (state) {
  return [
    {
      type: 'label',
      props: {
        text: 'Ii desu ne?',
      }
    },
    {
      type: 'label',
      props: {
        text: 'Counter:',
        color: 'info'
      }
    },
    {
      type: 'label',
      props: {
        text: `${state}`,
        color: 'warning'
      }
    },
    {
      type: 'button',
      props: {
        color: 'success',
        icon: 'jump-up',
        action: { type: 'INCREMENT' }
      }
    },
    {
      type: 'button',
      props: {
        color: 'error',
        icon: 'jump-down',
        action: { type: 'DECREMENT' }
      }
    }
  ]
}

const io = socketIo(1435)
const store = createStore(reducer)
const selectUi = createSelector(state => state, render)

io.on('connection', socket => {
  console.log('New socket connected')
  socket.emit('ui', selectUi(store.getState()))
  socket.on('dispatch', action => {
    store.dispatch(action)
  })
})

store.subscribe(() => {
  io.emit('ui', selectUi(store.getState()))
})
