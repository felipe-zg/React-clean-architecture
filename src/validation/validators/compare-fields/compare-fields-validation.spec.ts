import faker from 'faker'
import { InvalidFieldError } from '@/validation/erros/invalid-field-error'
import { CompareFieldsValidation } from './compare-fields-validation'

const makeSut = (valueToCOmpare: string): CompareFieldsValidation => new CompareFieldsValidation(faker.database.column(), valueToCOmpare)

describe('CompareFieldsValidation', () => {
  it('Should return error if fields are not equal', () => {
    const sut = makeSut(faker.random.word())
    const error = sut.validate(faker.random.word())
    expect(error).toEqual(new InvalidFieldError())
  })
})
