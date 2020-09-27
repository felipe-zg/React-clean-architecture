import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'

import Context from '@/presentation/context/form/form-context'

import {
  Header,
  Input,
  SubmitButton,
  FormStatus,
  Footer
} from '@/presentation/components'
import Styles from './styles.scss'
import { Validation } from '@/presentation/protocols/validation'
import { Authentication, UpdateCurrentAccount } from '@/domain/use-cases'

type Props = {
  validation: Validation
  authentication: Authentication
  updateCurrentAccount: UpdateCurrentAccount
}

const Login: React.FC<Props> = ({
  validation,
  authentication,
  updateCurrentAccount
}: Props) => {
  const history = useHistory()
  const [state, setState] = useState({
    isLoading: false,
    email: '',
    password: '',
    emailError: '',
    passwordError: '',
    errorMessage: '',
    isFormInvalid: true
  })

  useEffect(() => {
    const { email, password } = state
    const formData = { email, password }
    const emailError = validation.validate('email', formData)
    const passwordError = validation.validate('password', formData)
    setState({
      ...state,
      emailError,
      passwordError,
      isFormInvalid: !!emailError || !!passwordError
    })
  }, [state.email, state.password])

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault()
    try {
      if (state.isLoading || state.emailError || state.passwordError) return
      setState({
        ...state,
        isLoading: true
      })
      const account = await authentication.auth({
        email: state.email,
        password: state.password
      })
      await updateCurrentAccount.save(account)
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
    <div className={Styles.loginWrap}>
      <Header />
      <Context.Provider value={{ state, setState }}>
        <form
          data-testid="form"
          className={Styles.form}
          onSubmit={handleSubmit}
        >
          <h2>Login</h2>
          <Input type="email" name="email" placeholder="Digite seu e-mail" />
          <Input
            type="password"
            name="password"
            placeholder="Digite sua senha"
          />
          <SubmitButton text="Entrar" />
          <Link
            replace
            to="/signup"
            data-testid="signup"
            className={Styles.link}
          >
            Criar conta
          </Link>
          <FormStatus />
        </form>
      </Context.Provider>
      <Footer />
    </div>
  )
}

export default Login
