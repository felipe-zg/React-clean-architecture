import { FieldValidationSpy } from '../test'
import { ValidationComposite } from './validation-composite'

type SutTypes = {
  sut: ValidationComposite
  validationsSpy: FieldValidationSpy[]
}

const makeSut = (): SutTypes => {
  const validationsSpy = [
    new FieldValidationSpy('any_field'),
    new FieldValidationSpy('any_field')
  ]
  const sut = new ValidationComposite(validationsSpy)

  return {
    sut,
    validationsSpy
  }
}

describe('ValidationComposite', () => {
  it('Should return the first error found if any validation fails', () => {
    const { sut, validationsSpy } = makeSut()
    validationsSpy[0].error = new Error('any_error_message')
    validationsSpy[1].error = new Error('any_error_message_2')
    const error = sut.validate('any_field', 'any_field')
    expect(error).toBe('any_error_message')
  })
})
