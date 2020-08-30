import React, { useState } from 'react'
import Context from '@/presentation/context/form/form-context'

import { LoginHeader, Input, FormStatus, Footer } from '@/presentation/components'
import Styles from './styles.scss'

const Login: React.FC = () => {
  const [state] = useState({
    isLoading: false,
    errorMessage: ''
  })

  const [errorState] = useState({
    email: 'Campo obrigatório',
    password: 'Campo obrigatório',
    message: ''
  })

  return (
    <div className={Styles.login}>
      <LoginHeader/>
      <Context.Provider value={{ state, errorState }}>
        <form className={Styles.form}>
          <h2>Login</h2>
          <Input type="email" name="email" placeholder="Digite seu e-mail"/>
          <Input type="password" name="password" placeholder="Digite sua senha"/>
          <button data-testid="submit-button" disabled type="submit" className={Styles.submit}>Entrar</button>
          <span className={Styles.link}>Criar conta</span>
          <FormStatus/>
        </form>
      </Context.Provider>
      <Footer />
    </div>
  )
}

export default Login
