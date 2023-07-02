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
import { USER_APPLICATION_TOKENS } from '2-application/tokens/userApplicationTokens'

@injectable()
export class DeleteUserUseCase implements DeleteUseCase {
  constructor(
    @inject(USER_APPLICATION_TOKENS.UsersRepository)
    private readonly UsersRepository: UsersRepository,
  ) {}

  async execute(input: InputDeleteUseCase): OutputDeleteUseCase {
    const result = await this.UsersRepository.delete(input.id)
    if (!result) return left(ApplicationError.internalServerError())
    return right(ApplicationResult.success(result))
  }
}
