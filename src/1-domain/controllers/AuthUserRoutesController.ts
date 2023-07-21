import { ApplicationError } from '0-core/application/result/ApplicationError'
import { ApplicationResult } from '0-core/application/result/ApplicationResult'
import { Either } from '0-core/domain/result/Either'
import { OutputSing } from '1-domain/services/TokenService'

export type InputAuthenticateUser = {
  email: string
  password: string
}

export type OutputAuthenticateUser = Promise<
  Either<ApplicationError, ApplicationResult<OutputSing>>
>

export type InputUpdateUserPassword = {
  oldPassword: string
  newPassword: string
}

export type OutputUpdateUserPassword = Promise<
  Either<ApplicationError, ApplicationResult<boolean>>
>

export interface AuthUserRoutesController {
  authenticateUser: (input: InputAuthenticateUser) => OutputAuthenticateUser
}

export interface UpdateUserPasswordRoutesController {
  updateUserPassword: (
    input: InputUpdateUserPassword,
  ) => OutputUpdateUserPassword
}
