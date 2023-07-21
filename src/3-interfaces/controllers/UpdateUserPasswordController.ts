import { inject, injectable } from 'inversify'

import { left, right } from '0-core/domain/result/Either'
import {
  InputUpdateUserPassword,
  OutputUpdateUserPassword,
  UpdateUserPasswordRoutesController,
} from '1-domain/controllers/AuthUserRoutesController'
import { APPLICATION_TOKENS } from '2-application/tokens/applicationTokens'
import { UpdateUserPasswordUseCase } from '2-application/useCases/auth/UpdateUserPasswordUseCase'

@injectable()
export class UpdateUserPasswordController
  implements UpdateUserPasswordRoutesController
{
  constructor(
    @inject(APPLICATION_TOKENS.UpdateUserPasswordUseCase)
    private readonly updateUserPasswordUseCase: UpdateUserPasswordUseCase,
  ) {}

  async updateUserPassword(
    input: InputUpdateUserPassword,
  ): OutputUpdateUserPassword {
    const result = await this.updateUserPasswordUseCase.execute(input)
    if (result.isLeft()) return left(result.value)
    return right(result.value)
  }
}
