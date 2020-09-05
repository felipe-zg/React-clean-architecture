import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'

import Context from '@/presentation/context/form/form-context'

import { LoginHeader, Input, FormStatus, Footer } from '@/presentation/components'
import Styles from './styles.scss'
import { Validation } from '@/presentation/protocols/validation'
import { Authentication, LocalSaveAccessToken } from '@/domain/use-cases'

type Props = {
  validation: Validation
  authentication: Authentication
  saveAccessToken: LocalSaveAccessToken
}

const Login: React.FC<Props> = ({ validation, authentication, saveAccessToken }: Props) => {
  const history = useHistory()
  const [state, setState] = useState({
    isLoading: false,
    email: '',
    password: '',
    emailError: '',
    passwordError: '',
    errorMessage: ''
  })

  useEffect(() => {
    setState({
      ...state,
      emailError: validation.validate('email', state.email),
      passwordError: validation.validate('password', state.password)
    })
  }, [state.email, state.password])

  const handleSubmit = async(event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    try {
      if (state.isLoading || state.emailError || state.passwordError) return
      setState({
        ...state,
        isLoading: true
      })
      const account = await authentication.auth({ email: state.email, password: state.password })
      await saveAccessToken.save(account.accessToken)
      history.replace('/')
    } catch (error) {
      setState({
        ...state,
        isLoading: false,
        errorMessage: error.message
      })
    }
  }

  return (
    <div className={Styles.login}>
      <LoginHeader/>
      <Context.Provider value={{ state, setState }}>
        <form data-testid="form" className={Styles.form} onSubmit={handleSubmit}>
          <h2>Login</h2>
          <Input type="email" name="email" placeholder="Digite seu e-mail"/>
          <Input type="password" name="password" placeholder="Digite sua senha"/>
          <button
            data-testid="submit-button"
            disabled={!!state.emailError || !!state.passwordError}
            type="submit"
            className={Styles.submit}
          >Entrar</button>
          <Link to="/signup" data-testid="signup" className={Styles.link}>Criar conta</Link>
          <FormStatus/>
        </form>
      </Context.Provider>
      <Footer />
    </div>
  )
}

export default Login
