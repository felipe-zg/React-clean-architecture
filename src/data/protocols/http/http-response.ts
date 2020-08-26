export enum HttpStatusCode {
  ok = 200,
  badRequest = 400,
  unauthorized = 401
}

export type HttpResponse = {
  statusCode: HttpStatusCode
  body?: any
}
