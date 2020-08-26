export class UnexpectedError extends Error {
  constructor() {
    super('Algo deu errado, tente de novo em breve!')
    this.name = 'UnexpectedError'
  }
}
