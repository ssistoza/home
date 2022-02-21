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
}

export interface PostRequest {
  shanesistoza: boolean;
}
