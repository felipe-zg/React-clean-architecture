import { makeSignupValidation } from './signup-validation-factory'
import { ValidationComposite } from '@/validation/validators'
import { ValidationBuilder as Builder } from '@/validation/validators/builder/validation-builder'

describe('makeSignupValidation', () => {
  it('should make ValidationComposite with correct validations', () => {
    const compose = makeSignupValidation()
    expect(compose).toEqual(
      ValidationComposite.build([
        ...Builder.field('name').required().min(5).build(),
        ...Builder.field('email').required().email().build(),
        ...Builder.field('password').required().min(5).build(),
        ...Builder.field('passwordConfirmation')
          .required()
          .sameAs('password')
          .build()
      ])
    )
  })
})
