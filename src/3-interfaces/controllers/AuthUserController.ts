import { inject, injectable } from 'inversify'

import { ApplicationError } from '0-core/application/result/ApplicationError'
import { ApplicationResult } from '0-core/application/result/ApplicationResult'
import { Either, left, right } from '0-core/domain/result/Either'
import {
  AuthUserRoutesController,
  InputAuthenticateUser,
  InputUpdateUserPassword,
} from '1-domain/controllers/AuthUserRoutesController'
import { OutputSing } from '1-domain/services/TokenService'
import { APPLICATION_TOKENS } from '2-application/tokens/applicationTokens'
import { AuthUserUseCase } from '2-application/useCases/auth/AuthUserUseCase'

@injectable()
export class AuthUserController implements AuthUserRoutesController {
  constructor(
    @inject(APPLICATION_TOKENS.AuthUserUseCase)
    private readonly authUserUseCase: AuthUserUseCase,
  ) {}

  async authenticateUser(
    input: InputAuthenticateUser,
  ): Promise<Either<ApplicationError, ApplicationResult<OutputSing>>> {
    const result = await this.authUserUseCase.execute(input)
    if (result.isLeft()) return left(result.value)
    return right(result.value)
  }

  async updateUserPassword(
    input: InputUpdateUserPassword,
  ): Promise<Either<ApplicationError, ApplicationResult<boolean>>> {
    throw new Error('Not implemented')
  }
}
