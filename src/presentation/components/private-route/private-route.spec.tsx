import React from 'react'
import { Router } from 'react-router-dom'
import { createMemoryHistory, MemoryHistory } from 'history'
import { render } from '@testing-library/react'
import PrivateRoute from './private-route'
import { ApiContext } from '@/presentation/context'
import { AccountModel } from '@/domain/models'
import { mockAccountModel } from '@/domain/test'

type SutTypes = {
  history: MemoryHistory
}

const makeSut = (account = mockAccountModel()): SutTypes => {
  const history = createMemoryHistory({ initialEntries: ['/'] })
  render(
    <ApiContext.Provider value={{ getCurrentAccount: () => account }}>
      <Router history={history}>
        <PrivateRoute />
      </Router>
    </ApiContext.Provider>
  )

  return {
    history
  }
}

describe('PrivateRoute', () => {
  it('should redirect to /login if accessToken is empty', () => {
    const { history } = makeSut(null)
    expect(history.location.pathname).toBe('/login')
  })

  it('should render current component if accessToken is not empty', () => {
    const { history } = makeSut()
    expect(history.location.pathname).toBe('/')
  })
})
