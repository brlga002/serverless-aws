import { inject, injectable } from 'inversify'

import { ApplicationError } from '0-core/application/result/ApplicationError'
import { ApplicationResult } from '0-core/application/result/ApplicationResult'
import {
  GetUseCase,
  InputGetUseCase,
  OutputGetUseCase,
} from '0-core/application/useCases/GetUseCase'
import { left, right } from '0-core/domain/result/Either'
import { UserDto } from '1-domain/entities/User/User'
import { UsersRepository } from '2-application/repositories/UsersRepository'
import { APPLICATION_TOKENS } from '2-application/tokens/applicationTokens'

@injectable()
export class GetUserUseCase implements GetUseCase<UserDto> {
  constructor(
    @inject(APPLICATION_TOKENS.UsersRepository)
    private readonly UsersRepository: UsersRepository,
  ) {}

  async execute(input: InputGetUseCase): OutputGetUseCase<UserDto> {
    const user = await this.UsersRepository.getById(input.id)
    if (!user) return left(ApplicationError.notFound())
    return right(ApplicationResult.success(user.toJSON()))
  }
}
