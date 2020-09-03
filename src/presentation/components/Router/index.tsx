import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

type Props = {
  makeLogin: React.FC
}

const Router: React.FC<Props> = ({ makeLogin }: Props) => {
  return (
    <BrowserRouter>
      <Route path="/login" exact component={makeLogin}/>
    </BrowserRouter>
  )
}

export default Router
