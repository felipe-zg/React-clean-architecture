import React from 'react'
import Logo from '@/presentation/components/Logo'

import Styles from './styles.scss'

const LoginHeader: React.FC = () => {
  return (
    <header className={Styles.header}>
      <Logo/>
      <h1>4DEV - Enquetes para programadores</h1>
    </header>
  )
}

export default LoginHeader
