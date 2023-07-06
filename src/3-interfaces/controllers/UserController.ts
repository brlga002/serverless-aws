import { inject, injectable } from 'inversify'

import { OutputCreateUseCase } from '0-core/application/useCases/CreateUseCase'
import {
  InputDeleteUseCase,
  OutputDeleteUseCase,
} from '0-core/application/useCases/DeleteUseCase'
import {
  InputGetUseCase,
  OutputGetUseCase,
} from '0-core/application/useCases/GetUseCase'
import {
  InputListUseCase,
  OutputListUseCase,
} from '0-core/application/useCases/ListUseCase'
import {
  InputUpdateUseCase,
  OutputUpdateUseCase,
} from '0-core/application/useCases/UpdateUseCase'
import { left, right } from '0-core/domain/result/Either'
import { UserRoutesController } from '1-domain/controllers/UserRoutesController'
import { NewUserDto, UpdateUserDto, UserDto } from '1-domain/entities/User/User'
import { APPLICATION_TOKENS } from '2-application/tokens/applicationTokens'
import { CreateUserUseCase } from '2-application/useCases/user/CreateUserUseCase'
import { DeleteUserUseCase } from '2-application/useCases/user/DeleteUserUseCase'
import { GetUserUseCase } from '2-application/useCases/user/GetUserUseCase'
import { ListUsersUseCase } from '2-application/useCases/user/ListUsersUseCase'
import { UpdateUserUseCase } from '2-application/useCases/user/UpdateUserUseCase'

@injectable()
export class UserController implements UserRoutesController {
  constructor(
    @inject(APPLICATION_TOKENS.CreateUserUseCase)
    private readonly createUserUseCase: CreateUserUseCase,
    @inject(APPLICATION_TOKENS.DeleteUserUseCase)
    private readonly deleteUserUseCase: DeleteUserUseCase,
    @inject(APPLICATION_TOKENS.GetUserUseCase)
    private readonly getUserUseCase: GetUserUseCase,
    @inject(APPLICATION_TOKENS.ListUsersUseCase)
    private readonly listUsersUseCase: ListUsersUseCase,
    @inject(APPLICATION_TOKENS.UpdateUserUseCase)
    private readonly updateUserUseCase: UpdateUserUseCase,
  ) {}

  async createEntity(input: NewUserDto): OutputCreateUseCase<NewUserDto> {
    const result = await this.createUserUseCase.execute(input)
    if (result.isLeft()) return left(result.value)
    return right(result.value)
  }

  async listEntities(input: InputListUseCase): OutputListUseCase<UserDto> {
    const result = await this.listUsersUseCase.execute(input)
    if (result.isLeft()) return left(result.value)
    return right(result.value)
  }

  async getEntity(input: InputGetUseCase): OutputGetUseCase<UserDto> {
    const result = await this.getUserUseCase.execute(input)
    if (result.isLeft()) return left(result.value)
    return right(result.value)
  }

  async updateEntity(
    input: InputUpdateUseCase<UpdateUserDto>,
  ): OutputUpdateUseCase<UserDto> {
    const result = await this.updateUserUseCase.execute(input)
    if (result.isLeft()) return left(result.value)
    return right(result.value)
  }

  async deleteEntity(input: InputDeleteUseCase): OutputDeleteUseCase {
    const result = await this.deleteUserUseCase.execute(input)
    if (result.isLeft()) return left(result.value)
    return right(result.value)
  }
}
