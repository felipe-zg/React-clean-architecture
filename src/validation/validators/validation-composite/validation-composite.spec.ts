import faker from 'faker'
import { FieldValidationSpy } from '../test'
import { ValidationComposite } from './validation-composite'

type SutTypes = {
  sut: ValidationComposite
  validationsSpy: FieldValidationSpy[]
}

const makeSut = (fieldName: string): SutTypes => {
  const validationsSpy = [
    new FieldValidationSpy(fieldName),
    new FieldValidationSpy(fieldName)
  ]
  const sut = ValidationComposite.build(validationsSpy)

  return {
    sut,
    validationsSpy
  }
}

describe('ValidationComposite', () => {
  it('Should return the first error found if any validation fails', () => {
    const fieldName = faker.database.column()
    const { sut, validationsSpy } = makeSut(fieldName)
    const errorMessage = faker.random.words()
    validationsSpy[0].error = new Error(errorMessage)
    validationsSpy[1].error = new Error(faker.random.words())
    const error = sut.validate(fieldName, faker.random.words())
    expect(error).toBe(errorMessage)
  })

  it('Should return falsy if validations succeeds', () => {
    const fieldName = faker.database.column()
    const { sut } = makeSut(fieldName)
    const error = sut.validate(fieldName, faker.random.words())
    expect(error).toBeFalsy()
  })
})
