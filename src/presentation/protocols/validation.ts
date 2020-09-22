export interface Validation {
  // eslint-disable-next-line @typescript-eslint/ban-types
  validate: (fieldNamme: string, data: object) => string
}
