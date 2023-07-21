import { inject, injectable } from 'inversify'

import { ApplicationError } from '0-core/application/result/ApplicationError'
import { ApplicationResult } from '0-core/application/result/ApplicationResult'
import { BaseUseCase } from '0-core/application/useCases/BaseUseCase'
import { left, right } from '0-core/domain/result/Either'
import { CurrentUser } from '1-domain/auth/CurrentUser'
import {
  InputUpdateUserPassword,
  OutputUpdateUserPassword,
} from '1-domain/controllers/AuthUserRoutesController'
import { UsersRepository } from '2-application/repositories/UsersRepository'
import { APPLICATION_TOKENS } from '2-application/tokens/applicationTokens'

@injectable()
export class UpdateUserPasswordUseCase
  implements BaseUseCase<InputUpdateUserPassword, OutputUpdateUserPassword>
{
  constructor(
    @inject(APPLICATION_TOKENS.UsersRepository)
    private readonly usersRepository: UsersRepository,
    @inject(APPLICATION_TOKENS.CurrentUser)
    private readonly currentUser: CurrentUser,
  ) {}

  async execute(input: InputUpdateUserPassword): OutputUpdateUserPassword {
    const user = await this.usersRepository.getById(this.currentUser.userId)
    if (!user)
      return left(
        ApplicationError.notFound(
          `User with id '${this.currentUser.userId}' was not found.`,
        ),
      )

    const result = await user.changePassword(
      input.oldPassword,
      input.newPassword,
    )

    if (result.isLeft())
      return left(ApplicationError.badRequest(result.value.message))

    return right(ApplicationResult.success(true))
  }
}
