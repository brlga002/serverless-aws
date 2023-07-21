import { inject, injectable } from 'inversify'

import { ApplicationError } from '0-core/application/result/ApplicationError'
import { ApplicationResult } from '0-core/application/result/ApplicationResult'
import {
  InputListUseCase,
  ListUseCase,
  OutputListUseCase,
} from '0-core/application/useCases/ListUseCase'
import { left, right } from '0-core/domain/result/Either'
import { UserDto } from '1-domain/entities/User/User'
import { UsersRepository } from '2-application/repositories/UsersRepository'
import { APPLICATION_TOKENS } from '2-application/tokens/applicationTokens'

@injectable()
export class ListUsersUseCase implements ListUseCase<UserDto> {
  constructor(
    @inject(APPLICATION_TOKENS.UsersRepository)
    private readonly UsersRepository: UsersRepository,
  ) {}

  async execute(input: InputListUseCase): OutputListUseCase<UserDto> {
    try {
      const users = await this.UsersRepository.list(input)
      return right(ApplicationResult.success(users))
    } catch (error) {
      return left(ApplicationError.badRequest('Failed to list Users.'))
    }
  }
}
