export class EmailAlreadyExistsError extends Error {
  constructor() {
    super('E-mail já cadastrado')
    this.name = 'EmailAlreadyExistsError'
  }
}
