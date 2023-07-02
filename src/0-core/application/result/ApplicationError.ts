import { Exception } from '../exceptions/Exception'

export class ApplicationError extends Exception {
  readonly name = 'ApplicationError'

  protected constructor(public errorCode: number, public error: string) {
    super(errorCode, error)
  }

  static badRequest(message = 'BadRequest') {
    return new ApplicationError(400, message)
  }

  static unauthorized(message = 'Unauthorized') {
    return new ApplicationError(401, message)
  }

  static forbidden(message = 'Forbidden') {
    return new ApplicationError(403, message)
  }

  static notFound(message = 'Not Found') {
    return new ApplicationError(404, message)
  }

  static methodNotAllowed(message = 'Method Not Allowed') {
    return new ApplicationError(405, message)
  }

  static conflict(message = 'Conflict') {
    return new ApplicationError(409, message)
  }

  static unsupportedMediaType(message = 'Unsupported Media Type') {
    return new ApplicationError(415, message)
  }

  static unprocessableEntity(message = 'Unprocessable Entity') {
    return new ApplicationError(422, message)
  }

  static internalServerError(message = 'Internal Server Error') {
    return new ApplicationError(500, message)
  }

  static notImplemented(message = 'Not Implemented') {
    return new ApplicationError(501, message)
  }
}
