import faker from 'faker'
import { ValidationBuilder as sut } from './validation-builder'
import { RequiredFieldValidation } from '../required-field/required-field-validation'
import { EmailValidation } from '../email/email-validation'

describe('ValidationBuilder', () => {
  it('Should return RequiredFieldError', () => {
    const field = faker.database.column()
    const validators = sut.field(field).required().build()
    expect(validators).toEqual([new RequiredFieldValidation(field)])
  })

  it('Should return EmailValidation', () => {
    const field = faker.database.column()
    const validators = sut.field(field).email().build()
    expect(validators).toEqual([new EmailValidation(field)])
  })
})
