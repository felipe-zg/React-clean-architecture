export interface FieldValidation {
  field: string
  validate(fieldName: string): Error
}
