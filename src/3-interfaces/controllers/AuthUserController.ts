import { inject, injectable } from 'inversify'

import { ApplicationError } from '0-core/application/result/ApplicationError'
import { ApplicationResult } from '0-core/application/result/ApplicationResult'
import { UserAuthToken  } from '0-core/domain/entities/TokenJwt'
import { Either, left, right } from '0-core/domain/result/Either'
import {
  AuthUserRoutesController,
  InputAuthenticateUser,
  InputUpdateUserPassword,
} from '1-domain/controllers/AuthUserRoutesController'
import { USER_APPLICATION_TOKENS } from '2-application/tokens/userApplicationTokens'
import { AuthUserUseCase } from '2-application/useCases/auth/AuthUserUseCase'
import { CreateUserUseCase } from '2-application/useCases/user/CreateUserUseCase'

@injectable()
export class AuthUserController implements AuthUserRoutesController {
  constructor(
    @inject(USER_APPLICATION_TOKENS.AuthUserUseCase)
    private readonly authUserUseCase: AuthUserUseCase,
    @inject(USER_APPLICATION_TOKENS.CreateUserUseCase)
    private readonly createUserUseCase: CreateUserUseCase,
  ) {}

  async authenticateUser(
    input: InputAuthenticateUser,
  ): Promise<Either<ApplicationError, ApplicationResult<UserAuthToken >>> {
    const result = await this.authUserUseCase.execute(input)
    if (result.isLeft()) return left(result.value)
    return right(result.value)
  }

  async updateUserPassword(
    input: InputUpdateUserPassword,
  ): Promise<Either<ApplicationError, ApplicationResult<boolean>>> {
    const result = await this.authUserUseCase.execute(input)
    if (result.isLeft()) return left(result.value)
    return right(result.value)
  }
}
