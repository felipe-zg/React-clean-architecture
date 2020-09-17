import faker from 'faker'
import { AddAccountParams } from '../use-cases'

export const mockAddAccount = (): AddAccountParams => {
  const password = faker.internet.password()
  return {
    name: faker.name.findName(),
    email: faker.internet.email(),
    password,
    passwordConfirmation: password
  }
}
