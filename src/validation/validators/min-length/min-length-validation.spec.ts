import faker from 'faker'
import { MinLengthValidation } from './min-length-validation'
import { InvalidFieldError } from '@/validation/erros/invalid-field-error'

describe('MinLencthValidation', () => {
  it('should return an error if field length is invalid', () => {
    const sut = new MinLengthValidation(faker.random.word(), 5)
    const error = sut.validate(faker.random.alphaNumeric(4))
    expect(error).toEqual(new InvalidFieldError())
  })

  it('should return falsy if field length is valid', () => {
    const sut = new MinLengthValidation(faker.random.word(), 5)
    const error = sut.validate(faker.random.alphaNumeric(5))
    expect(error).toBeFalsy()
  })
})
