import { FieldValidationSpy } from '../test'
import { ValidationComposite } from './validation-composite'

describe('ValidationComposite', () => {
  it('Should return the first error found if any validation fails', () => {
    const fielValidationSpy = new FieldValidationSpy('any_field')
    const fielValidationSpy2 = new FieldValidationSpy('any_field')
    fielValidationSpy.error = new Error('any_error_message')
    fielValidationSpy2.error = new Error('any_error_message_2')
    const sut = new ValidationComposite([
      fielValidationSpy,
      fielValidationSpy2
    ])
    const error = sut.validate('any_field', 'any_field')
    expect(error).toBe('any_error_message')
  })
})
