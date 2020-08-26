export enum HttpStatusCode {
  ok = 200,
  badRequest = 400,
  unauthorized = 401,
  notFound = 404,
  serverError = 500
}

export type HttpResponse<T> = {
  statusCode: HttpStatusCode
  body?: T
}
