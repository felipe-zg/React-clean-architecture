import {
  HttpPostClient,
  HttpPostClientParams
} from '@/data/protocols/http/http-post-client'

export class HttpPostClientSpy implements HttpPostClient {
  url?: string
  body?: Object

  async post(params: HttpPostClientParams): Promise<void> {
    this.url = params.url
    this.body = params.body
    return Promise.resolve()
  }
}
