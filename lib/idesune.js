'use babel'
/* global atom */

import React from 'react'
import ReactDOM from 'react-dom'
import IdesuneContainer from './IdesuneContainer'

export default {
  activate (state) {
    this.element = document.createElement('div')
    this.element.innerHTML = 'Omachi kudasai…'
    this.panel = atom.workspace.addTopPanel({ item: this.element })
    ReactDOM.render(<IdesuneContainer />, this.element)
  },

  deactivate () {
    ReactDOM.unmountComponentAtNode(this.element)
    this.panel.destroy()
  },

  serialize () {
    return { }
  }
}
