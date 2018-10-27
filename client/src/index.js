import React from 'react'
import ReactDOM from 'react-dom'

import './index.css'
import MockDataProvider from './views/MockDataProvider'
import TerminateModalFlow from './components/TerminateModalFlow.react'

ReactDOM.render(
  <MockDataProvider>
    {props => <TerminateModalFlow {...props} />}
  </MockDataProvider>,
  document.getElementById('root')
)

// Hot Module Replacement
if (module.hot) {
  module.hot.accept()
}
