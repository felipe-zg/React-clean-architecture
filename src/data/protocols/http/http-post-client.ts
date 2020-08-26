import { HttpResponse } from '@/data/protocols/http'

export type HttpPostClientParams<T> = {
  url: string
  body?: T
}

export interface HttpPostClient<T, R> {
  post(params: HttpPostClientParams<T>): Promise<HttpResponse<R>>
}
