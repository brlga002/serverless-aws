import { ApplicationError } from '0-core/application/result/ApplicationError'
import { ApplicationResult } from '0-core/application/result/ApplicationResult'
import { Either } from '0-core/domain/result/Either'
import { OutputSing } from '1-domain/services/TokenService'

export type InputAuthenticateUser = {
  email: string
  password: string
}

export type InputUpdateUserPassword = {
  oldPassword: string
  newPassword: string
}

export interface AuthUserRoutesController {
  authenticateUser: (
    input: InputAuthenticateUser,
  ) => Promise<Either<ApplicationError, ApplicationResult<OutputSing>>>
  updateUserPassword: (
    input: InputUpdateUserPassword,
  ) => Promise<Either<ApplicationError, ApplicationResult<boolean>>>
}
