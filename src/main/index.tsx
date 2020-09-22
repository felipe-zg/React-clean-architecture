import React from 'react'
import ReactDOM from 'react-dom'
import { Router } from '@/presentation/components'

import '@/presentation/styles/global.scss'
import makeLogin from '@/main/factories/pages/login/login-factory'
import makeSignup from './factories/pages/signup/signup-factory'

ReactDOM.render(
  <Router makeLogin={makeLogin} makeSignup={makeSignup} />,
  document.getElementById('main')
)
