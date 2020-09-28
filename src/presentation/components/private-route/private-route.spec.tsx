import React from 'react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { render } from '@testing-library/react'
import PrivateRoute from './private-route'

describe('PrivateRoute', () => {
  it('should redirect to /login if accessToken is empty', () => {
    const history = createMemoryHistory({ initialEntries: ['/'] })
    render(
      <Router history={history}>
        <PrivateRoute />
      </Router>
    )

    expect(history.location.pathname).toBe('/login')
  })
})
