import React from 'react'
import { SignUp } from '@/presentation/pages'
import { makeRemoteAddAccount } from '@/main/factories/use-cases/add-account/remote-add-account-factory'
import { makeSignupValidation } from '@/main/factories/pages/signup/signup-validation-factory'

const makeSignup: React.FC = () => {
  return (
    <SignUp
      addAccount={makeRemoteAddAccount()}
      validation={makeSignupValidation()}
    />
  )
}

export default makeSignup
