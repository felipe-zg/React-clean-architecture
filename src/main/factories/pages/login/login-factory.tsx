import React from 'react'
import { Login } from '@/presentation/pages'
import { makeRemoteAuthentication } from '@/main/factories/use-cases/authentication/remote-authentication-factory'
import { makeLoginValidation } from '@/main/factories/pages/login/login-validation-factory'
import { makeUpdateCurrentAccount } from '@/main/factories/use-cases/local-save-access-token/local-save-access-token-factory'

const makeLogin: React.FC = () => {
  return (
    <Login
      authentication={makeRemoteAuthentication()}
      validation={makeLoginValidation()}
      updateCurrentAccount={makeUpdateCurrentAccount()}
    />
  )
}

export default makeLogin
