import { HttpPostClientParams } from '../protocols/http'
import faker from 'faker'

export const mockPostRequest = (): HttpPostClientParams<any> => ({
  url: faker.internet.url(),
  body: faker.random.objectElement()
})
