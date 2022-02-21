export enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PATCH = 'PATCH',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export enum HttpStatus {
  OK = 200,
  CREATED = 201,
  UNAUTHORIZED = 401,
  METHOD_NOT_ALLOWED = 405,
}

export interface PostRequest {
  isShane?: boolean;
  isTest?: boolean;
}
