import { HttpResponse } from '@/data/protocols/http'

export type HttpPostClientParams = {
  url: string
  body?: object
}

export interface HttpPostClient {
  post(params: HttpPostClientParams): Promise<HttpResponse>
}
