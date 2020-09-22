import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

type Factory = {
  makeLogin: React.FC
  makeSignup: React.FC
}

const Router: React.FC<Factory> = (factory: Factory) => {
  return (
    <BrowserRouter>
      <Route path="/login" component={factory.makeLogin} />
      <Route path="/signup" component={factory.makeSignup} />
    </BrowserRouter>
  )
}

export default Router
