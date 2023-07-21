import { inject, injectable } from 'inversify'

import { ApplicationError } from '0-core/application/result/ApplicationError'
import { ApplicationResult } from '0-core/application/result/ApplicationResult'
import {
  DeleteUseCase,
  InputDeleteUseCase,
  OutputDeleteUseCase,
} from '0-core/application/useCases/DeleteUseCase'
import { left, right } from '0-core/domain/result/Either'
import { UsersRepository } from '2-application/repositories/UsersRepository'
import { APPLICATION_TOKENS } from '2-application/tokens/applicationTokens'

@injectable()
export class DeleteUserUseCase implements DeleteUseCase {
  constructor(
    @inject(APPLICATION_TOKENS.UsersRepository)
    private readonly usersRepository: UsersRepository,
  ) {}

  async execute(input: InputDeleteUseCase): OutputDeleteUseCase {
    const user = await this.usersRepository.getById(input.id)
    if (!user)
      return left(
        ApplicationError.notFound(`User with id '${input.id}' was not found.`),
      )

    const result = await this.usersRepository.delete(input.id)
    if (!result)
      return left(
        ApplicationError.internalServerError('Failed to delete User.'),
      )
    return right(ApplicationResult.noContent())
  }
}
