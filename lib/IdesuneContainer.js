'use babel'
/* global atom */

import React from 'react'

import socketIoClient from 'socket.io-client'
import * as State from './State'
import IdesuneView from './IdesuneView'

export const IdesuneContainer = React.createClass({
  getInitialState () {
    return { state: State.initial }
  },
  componentDidMount () {
    this.socket = socketIoClient('http://127.0.0.1:1435')
    this.socket.on('connect', () => this.dispatch({ type: 'SOCKET_CONNECTED' }))
    this.socket.on('ui', (ui) => this.dispatch({ type: 'UI_STATE_RECEIVE', ui }))
    this.socket.on('disconnect', () => this.dispatch({ type: 'SOCKET_DISCONNECTED' }))
  },
  dispatch (event) {
    console.log(event)
    this.setState(({ state }) => ({ state: State.update(state, event) }))
  },
  componentWillUnmount () {
    // XXX: how do I disconnect a socket.io???
  },
  onDispatch (e) {
    if (!e) {
      atom.notifications.addWarning('Cannot dispatch empty option.')
      return
    }
    if (!e.type) {
      atom.notifications.addWarning('Cannot dispatch action because it does not contain a type.')
      return
    }
    this.socket.emit('dispatch', e)
  },
  render () {
    return <IdesuneView state={this.state.state} onDispatch={this.onDispatch} />
  }
})

export default IdesuneContainer
