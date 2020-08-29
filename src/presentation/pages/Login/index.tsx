import React from 'react'

import Header from '@/presentation/components/LoginHeader'
import Footer from '@/presentation/components/Footer'
import Input from '@/presentation/components/Input'
import FormStatus from '@/presentation/components/FormStatus'

import Styles from './styles.scss'

const Login: React.FC = () => {
  return (
    <div className={Styles.login}>
      <Header/>
      <form className={Styles.form}>
        <h2>Login</h2>
        <Input type="email" name="email" placeholder="Digite seu e-mail"/>
        <Input type="password" name="password" placeholder="Digite sua senha"/>
        <button type="submit" className={Styles.submit}>Entrar</button>
        <span className={Styles.link}>Criar conta</span>
        <FormStatus/>
      </form>
      <Footer />
    </div>
  )
}

export default Login
