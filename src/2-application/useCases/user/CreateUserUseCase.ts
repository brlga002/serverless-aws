import { inject, injectable } from 'inversify'

import { ApplicationError } from '0-core/application/result/ApplicationError'
import { ApplicationResult } from '0-core/application/result/ApplicationResult'
import {
  CreateUseCase,
  InputCreateUseCase,
  OutputCreateUseCase,
} from '0-core/application/useCases/CreateUseCase'
import { left, right } from '0-core/domain/result/Either'
import { NewUserDto, UserDto, UserEntity } from '1-domain/entities/User/User'
import { UsersRepository } from '2-application/repositories/UsersRepository'
import { APPLICATION_TOKENS } from '2-application/tokens/applicationTokens'

@injectable()
export class CreateUserUseCase implements CreateUseCase<UserDto> {
  constructor(
    @inject(APPLICATION_TOKENS.UsersRepository)
    private readonly UsersRepository: UsersRepository,
  ) {}

  async execute(
    input: InputCreateUseCase<NewUserDto>,
  ): OutputCreateUseCase<UserDto> {
    const result = UserEntity.create(input)
    if (result.isLeft())
      return left(ApplicationError.unprocessableEntity(result.value.message))

    const user = result.value
    await this.UsersRepository.create(user)

    return right(ApplicationResult.created(user.toJSON()))
  }
}
