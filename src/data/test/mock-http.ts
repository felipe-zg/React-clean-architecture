import {
  HttpResponse,
  HttpStatusCode,
  HttpPostClient,
  HttpPostClientParams,
  HttpGetClient,
  HttpGetParams
} from '@/data/protocols/http'

import faker from 'faker'

export const mockPostRequest = (): HttpPostClientParams => ({
  url: faker.internet.url(),
  body: faker.random.objectElement()
})

export class HttpPostClientSpy<R> implements HttpPostClient<R> {
  url?: string
  body?: any
  response: HttpResponse<R> = {
    statusCode: HttpStatusCode.ok
  }

  async post(params: HttpPostClientParams): Promise<HttpResponse<R>> {
    this.url = params.url
    this.body = params.body
    return Promise.resolve(this.response)
  }
}

export class HttpGetClientSpy<R> implements HttpGetClient<R> {
  url: string
  response: HttpResponse<R> = {
    statusCode: HttpStatusCode.ok
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  async get(params: HttpGetParams): Promise<HttpResponse<R>> {
    this.url = params.url
    return this.response
  }
}
