import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import { Login } from '@/presentation/pages'

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Route path="/login" exact component={Login}/>
    </BrowserRouter>
  )
}

export default Router