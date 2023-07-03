import { ApplicationResult } from '0-core/application/result/ApplicationResult'
import { Either } from '0-core/domain/result/Either'

import { BaseUseCase } from './BaseUseCase'
import { ApplicationError } from '../result/ApplicationError'

export type OutputGetUseCase<T> = Promise<
  Either<ApplicationError, ApplicationResult<T>>
>

export type InputGetUseCase = {
  id: string
}

export type GetUseCase<T> = BaseUseCase<InputGetUseCase, OutputGetUseCase<T>>
