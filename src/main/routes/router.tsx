import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import makeLogin from '@/main/factories/pages/login/login-factory'
import makeSignup from '@/main/factories/pages/signup/signup-factory'
import { SurveyList } from '@/presentation/pages'
import { ApiContext } from '@/presentation/context'
import {
  getCurrentAccountAdapter,
  setCurrentAccountAdapter
} from '../adapters/current-account-adapter'

const Router: React.FC = () => {
  return (
    <ApiContext.Provider
      value={{
        setCurrentAccount: setCurrentAccountAdapter,
        getCurrentAccount: getCurrentAccountAdapter
      }}
    >
      <BrowserRouter>
        <Route path="/login" component={makeLogin} />
        <Route path="/signup" component={makeSignup} />
        <Route path="/" exact component={SurveyList} />
      </BrowserRouter>
    </ApiContext.Provider>
  )
}

export default Router
