import React from 'react'
import { Link } from 'react-router-dom'
import { LoginHeader, Input, FormStatus, Footer } from '@/presentation/components'
import Styles from './styles.scss'

import Context from '@/presentation/context/form/form-context'

const Signup: React.FC = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
  }

  return (
    <div className={Styles.signup}>
      <LoginHeader/>
      <Context.Provider value={{ state: {} }}>
        <form data-testid="form" className={Styles.form} onSubmit={handleSubmit}>
          <h2>Login</h2>
          <Input type="text" name="name" placeholder="Digite seu nome"/>
          <Input type="email" name="email" placeholder="Digite seu e-mail"/>
          <Input type="password" name="password" placeholder="Digite sua senha"/>
          <Input type="password" name="passwordCorfimation" placeholder="Confirme sua senha"/>
          <button
            data-testid="submit-button"
            type="submit"
            className={Styles.submit}
          >
            Cadastrar
          </button>
          <Link to="/login" className={Styles.link}>Voltar para Login</Link>
          <FormStatus/>
        </form>
      </Context.Provider>
      <Footer />
    </div>
  )
}

export default Signup
