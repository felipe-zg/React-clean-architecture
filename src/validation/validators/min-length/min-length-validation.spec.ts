import faker from 'faker'
import { MinLengthValidation } from './min-length-validation'
import { InvalidFieldError } from '@/validation/erros/invalid-field-error'

describe('MinLencthValidation', () => {
  it('should return an error if field length is less than the required', () => {
    const sut = new MinLengthValidation(faker.random.word(), 5)
    const error = sut.validate(faker.random.alphaNumeric(4))
    expect(error).toEqual(new InvalidFieldError())
  })
})
