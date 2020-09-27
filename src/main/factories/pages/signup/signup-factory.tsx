import React from 'react'
import { SignUp } from '@/presentation/pages'
import { makeRemoteAddAccount } from '@/main/factories/use-cases/add-account/remote-add-account-factory'
import { makeSignupValidation } from '@/main/factories/pages/signup/signup-validation-factory'
import { makeUpdateCurrentAccount } from '@/main/factories/use-cases/local-save-access-token/local-save-access-token-factory'

const makeSignup: React.FC = () => {
  return (
    <SignUp
      addAccount={makeRemoteAddAccount()}
      validation={makeSignupValidation()}
      updateCurrentAccount={makeUpdateCurrentAccount()}
    />
  )
}

export default makeSignup
