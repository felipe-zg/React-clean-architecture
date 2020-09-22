import { Validation } from '@/presentation/protocols/validation'
import { FieldValidation } from '@/validation/protocols/field-validation'

export class ValidationComposite implements Validation {
  private constructor(private readonly validators: FieldValidation[]) {}

  static build(validators: FieldValidation[]): ValidationComposite {
    return new ValidationComposite(validators)
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  validate(field: string, data: object): string {
    const validators = this.validators.filter((v) => v.field === field)
    for (const validator of validators) {
      const error = validator.validate(data)
      if (error) {
        return error.message
      }
    }
  }
}
