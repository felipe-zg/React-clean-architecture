import { RequiredFieldValidation } from '@/validation/required-field/required-field-validation'
import { RequiredFieldError } from '@/validation/erros'

describe('RequiredFieldValidation', () => {
  it('should return an error if field is empty', () => {
    const sut = new RequiredFieldValidation('email')
    const error = sut.validate('')
    expect(error).toEqual(new RequiredFieldError())
  })
})
