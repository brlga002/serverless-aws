import { ApplicationResult } from '0-core/application/result/ApplicationResult'
import { Either } from '0-core/domain/result/Either'

import { BaseUseCase } from './BaseUseCase'
import { ApplicationError } from '../result/ApplicationError'

export type OutputUpdateUseCase<T> = Promise<
  Either<ApplicationError, ApplicationResult<T>>
>

export type InputUpdateUseCase<T> = { id: string } & T

export type UpdateUseCase<T> = BaseUseCase<
  InputUpdateUseCase<T>,
  OutputUpdateUseCase<T>
>
