import { inject, injectable } from 'inversify'

import { ApplicationError } from '0-core/application/result/ApplicationError'
import { ApplicationResult } from '0-core/application/result/ApplicationResult'
import { BaseUseCase } from '0-core/application/useCases/BaseUseCase'
import { Either, left, right } from '0-core/domain/result/Either'
import { OutputSing, TokenService } from '1-domain/services/TokenService'
import { UsersRepository } from '2-application/repositories/UsersRepository'
import { APPLICATION_TOKENS } from '2-application/tokens/applicationTokens'

type InputAuthUserUseCase = {
  password: string
  email: string
}

type OutputAuthUserUseCase = Promise<
  Either<ApplicationError, ApplicationResult<OutputSing>>
>

@injectable()
export class AuthUserUseCase
  implements BaseUseCase<InputAuthUserUseCase, OutputAuthUserUseCase>
{
  constructor(
    @inject(APPLICATION_TOKENS.UsersRepository)
    private readonly usersRepository: UsersRepository,
    @inject(APPLICATION_TOKENS.TokenService)
    private readonly tokenService: TokenService,
  ) {}

  async execute(input: InputAuthUserUseCase): OutputAuthUserUseCase {
    const user = await this.usersRepository.findByEmail(input.email)
    if (!user) return left(ApplicationError.notFound())

    const result = await user.validatePassword(input.password)
    if (result.isLeft())
      return left(ApplicationError.notFound(`The password is incorrect.`))

    const token = this.tokenService.sign({
      userId: user.props.id,
      name: user.props.name,
      role: user.props.role,
      tenantId: user.props.tenantId ?? 'TODO MASTER TENANT',
    })

    if (token.isLeft())
      return left(
        ApplicationError.internalServerError(`Error generating token.`),
      )

    return right(ApplicationResult.success(token.value))
  }
}
