export type HttpPostClientParams = {
  url: string
}

export interface HttpPostClient {
  post(params: HttpPostClientParams): Promise<void>
}
