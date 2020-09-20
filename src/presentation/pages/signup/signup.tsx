import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { LoginHeader, Input, FormStatus, Footer } from '@/presentation/components'
import Styles from './styles.scss'

import Context from '@/presentation/context/form/form-context'

const Signup: React.FC = () => {
  const [state] = useState({
    isLoading: false,
    nameError: 'campo obrigatório',
    emailError: 'campo obrigatório',
    passwordError: 'campo obrigatório',
    passwordConfirmationError: 'campo obrigatório',
    errorMessage: ''
  })

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
  }

  return (
    <div className={Styles.signup}>
      <LoginHeader/>
      <Context.Provider value={{ state }}>
        <form data-testid="form" className={Styles.form} onSubmit={handleSubmit}>
          <h2>Login</h2>
          <Input type="text" name="name" placeholder="Digite seu nome"/>
          <Input type="email" name="email" placeholder="Digite seu e-mail"/>
          <Input type="password" name="password" placeholder="Digite sua senha"/>
          <Input type="password" name="passwordConfirmation" placeholder="Confirme sua senha"/>
          <button
            data-testid="submit-button"
            disabled
            type="submit"
            className={Styles.submit}
          >
            Cadastrar
          </button>
          <span className={Styles.link}>Voltar para Login</span>
          <FormStatus/>
        </form>
      </Context.Provider>
      <Footer />
    </div>
  )
}

export default Signup
