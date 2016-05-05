'use babel'

export const initial = {
  status: 'CONNECTING',
  ui: [ ]
}

export function update (state, action) {
  switch (action.type) {
    case 'SOCKET_CONNECTED':
      return { ...state, status: 'CONNECTED' }
    case 'SOCKET_DISCONNECTED':
      return { ...state, status: 'LOST_CONNECTION' }
    case 'UI_STATE_RECEIVE':
      return { ...state, ui: action.ui }
    default:
      return state
  }
}

export const isConnecting = (state) => state.status === 'CONNECTING'

export const isConnectionLost = (state) => state.status === 'LOST_CONNECTION'
