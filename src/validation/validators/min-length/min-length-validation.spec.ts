import faker from 'faker'
import { MinLengthValidation } from './min-length-validation'
import { InvalidFieldError } from '@/validation/erros/invalid-field-error'

const makeSut = (): MinLengthValidation => new MinLengthValidation(faker.database.column(), 5)

describe('MinLencthValidation', () => {
  it('should return an error if field length is invalid', () => {
    const sut = makeSut()
    const error = sut.validate(faker.random.alphaNumeric(4))
    expect(error).toEqual(new InvalidFieldError())
  })

  it('should return falsy if field length is valid', () => {
    const sut = makeSut()
    const error = sut.validate(faker.random.alphaNumeric(5))
    expect(error).toBeFalsy()
  })
})
