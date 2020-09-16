import {
  HttpResponse,
  HttpStatusCode,
  HttpPostClient,
  HttpPostClientParams
} from '@/data/protocols/http'

import faker from 'faker'

export class HttpPostClientSpy<T, R> implements HttpPostClient<T, R> {
  url?: string
  body?: T
  response: HttpResponse<R> = {
    statusCode: HttpStatusCode.ok
  }

  async post(params: HttpPostClientParams<T>): Promise<HttpResponse<R>> {
    this.url = params.url
    this.body = params.body
    return Promise.resolve(this.response)
  }
}

export const mockPostRequest = (): HttpPostClientParams<any> => ({
  url: faker.internet.url(),
  body: faker.random.objectElement()
})
