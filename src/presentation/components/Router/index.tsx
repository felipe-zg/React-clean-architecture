import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { SignUp } from '@/presentation/pages'

type Props = {
  makeLogin: React.FC
}

const Router: React.FC<Props> = ({ makeLogin }: Props) => {
  return (
    <BrowserRouter>
      <Route path="/login" component={makeLogin}/>
      <Route path="/signup" component={SignUp}/>
    </BrowserRouter>
  )
}

export default Router
