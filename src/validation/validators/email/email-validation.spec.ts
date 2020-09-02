import { InvalidFieldError } from '@/validation/erros/invalid-field-error'
import { EmailValidation } from './email-validation'

describe('Email validation', () => {
  it('Should return error if email is invalid', () => {
    const sut = new EmailValidation('email')
    const error = sut.validate('email')
    expect(error).toEqual(new InvalidFieldError())
  })
})
