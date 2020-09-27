import faker from 'faker'
import { InvalidFieldError } from '@/validation/erros/invalid-field-error'
import { CompareFieldsValidation } from './compare-fields-validation'

const makeSut = (
  field: string,
  fieldToCompare: string
): CompareFieldsValidation => new CompareFieldsValidation(field, fieldToCompare)

describe('CompareFieldsValidation', () => {
  it('Should return error if fields are not equal', () => {
    const field = faker.database.column()
    const fieldToCompare = faker.database.column()
    const sut = makeSut(field, fieldToCompare)
    const error = sut.validate({
      [field]: faker.random.words(6),
      [fieldToCompare]: faker.random.words(7)
    })
    expect(error).toEqual(new InvalidFieldError())
  })

  it('Should return falsy if fields are equal', () => {
    const field = faker.database.column()
    const fieldToCompare = faker.database.column()
    const value = faker.random.word()
    const sut = makeSut(field, fieldToCompare)
    const validationResult = sut.validate({
      [field]: value,
      [fieldToCompare]: value
    })
    expect(validationResult).toBeFalsy()
  })
})
