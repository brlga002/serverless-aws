export class ApplicationResult<T = any> {
  private constructor(public successCode: number, public content?: T) {}

  static success<T>(value?: T): ApplicationResult<T> {
    return new ApplicationResult(200, value)
  }

  static created<T>(value: T): ApplicationResult<T> {
    return new ApplicationResult(201, value)
  }

  static accepted<T>(value: T): ApplicationResult<T> {
    return new ApplicationResult(202, value)
  }

  static nonAuthoritativeInformation<T>(value: T): ApplicationResult<T> {
    return new ApplicationResult(203, value)
  }

  static noContent<T>(value?: T): ApplicationResult<T> {
    return new ApplicationResult(204, value)
  }
}
