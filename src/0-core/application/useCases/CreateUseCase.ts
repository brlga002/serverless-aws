import { ApplicationResult } from '0-core/application/result/ApplicationResult'
import { Either } from '0-core/domain/result/Either'

import { BaseUseCase } from './BaseUseCase'
import { ApplicationError } from '../result/ApplicationError'

export type OutputCreateUseCase<T> = Promise<
  Either<ApplicationError, ApplicationResult<T>>
>

export type InputCreateUseCase<T> = T

export type CreateUseCase<T> = BaseUseCase<
  InputCreateUseCase<T>,
  OutputCreateUseCase<T>
>
