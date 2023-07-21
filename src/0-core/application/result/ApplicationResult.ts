import { Entity } from '0-core/domain/entities/Entity'

export class ApplicationResult<T = unknown> {
  private constructor(public successCode: number, public content?: T) {}

  static success<T>(value?: Entity | T): ApplicationResult<T> {
    const convertedValue = value as unknown as Entity<T>
    if (typeof convertedValue?.toJSON === 'function')
      return new ApplicationResult(200, convertedValue.toJSON(true))

    return new ApplicationResult(200, value as T)
  }

  static created<T>(value: Entity): ApplicationResult<T> {
    const convertedValue = value as unknown as Entity<T>
    if (typeof convertedValue?.toJSON === 'function')
      return new ApplicationResult(201, convertedValue.toJSON(true))

    return new ApplicationResult(201, value as T)
  }

  static accepted<T>(value: T): ApplicationResult<T> {
    return new ApplicationResult(202, value)
  }

  static nonAuthoritativeInformation<T>(value: T): ApplicationResult<T> {
    return new ApplicationResult(203, value)
  }

  static noContent(): ApplicationResult<boolean> {
    return new ApplicationResult(204, true)
  }
}
