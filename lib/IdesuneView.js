'use babel'

import React from 'react'

import * as State from './State'

const IdesuneSystemMessage = ({ text }) => (
  <div style={{ padding: 7 }} className='text-warning'>
    <strong>Idesune system message:</strong> {text}
  </div>
)

function colorClass (color) {
  switch (color) {
    case 'info': return 'text-info'
    case 'success': return 'text-success'
    case 'warning': return 'text-warning'
    case 'error': return 'text-error'
    default: return 'text-default'
  }
}

const Elements = {
  button: ({ text, color, onDispatch, action, icon }) => (
    <button className={'btn'} onClick={e => onDispatch(action)}>
      <span className={colorClass(color)}>
        {renderIcon(icon)}
        {text}
      </span>
    </button>
  ),
  label: ({ text, color, icon }) => (
    <span className={colorClass(color)}>{renderIcon(icon)} {text}</span>
  )
}

const renderIcon = (icon) => {
  if (!icon) return null
  return <span className={'icon-' + icon}></span>
}

const renderView = (view, onDispatch) => {
  const Element = Elements[view.type]
  if (!Element) {
    return <span><strong>Unknown element type:</strong> {view.type}</span>
  }
  return <Element {...view.props} onDispatch={onDispatch} />
}

export const IdesuneView = ({ state, onDispatch }) => {
  if (State.isConnecting(state)) {
    return <IdesuneSystemMessage text='Omachi kudasai: Connecting to server…' />
  } else if (State.isConnectionLost(state)) {
    return <IdesuneSystemMessage text='Lost connection to server! Reconnecting…' />
  } else {
    return <div style={{ padding: 3 }}>{state.ui.map(view => (
      <span style={{ display: 'inline-block', marginRight: 3 }}>
        {renderView(view, onDispatch)}
      </span>
    ))}</div>
  }
}

export default IdesuneView
