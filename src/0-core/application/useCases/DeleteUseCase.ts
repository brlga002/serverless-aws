import { ApplicationResult } from '0-core/application/result/ApplicationResult'
import { Either } from '0-core/domain/result/Either'

import { BaseUseCase } from './BaseUseCase'
import { ApplicationError } from '../result/ApplicationError'

export type OutputDeleteUseCase = Promise<
  Either<ApplicationError, ApplicationResult<boolean>>
>

export type InputDeleteUseCase = {
  id: string
}

export type DeleteUseCase = BaseUseCase<InputDeleteUseCase, OutputDeleteUseCase>
