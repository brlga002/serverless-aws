import { inject, injectable } from 'inversify'

import { ApplicationError } from '0-core/application/result/ApplicationError'
import { ApplicationResult } from '0-core/application/result/ApplicationResult'
import {
  CreateUseCase,
  InputCreateUseCase,
  OutputCreateUseCase,
} from '0-core/application/useCases/CreateUseCase'
import { left, right } from '0-core/domain/result/Either'
import { CurrentUser } from '1-domain/auth/CurrentUser'
import { Beer, BeerDto, NewBeerDto } from '1-domain/entities/Beer/Beer'
import { BeersRepository } from '2-application/repositories/BeersRepository'
import { APPLICATION_TOKENS } from '2-application/tokens/applicationTokens'

@injectable()
export class CreateBeerUseCase implements CreateUseCase<BeerDto> {
  constructor(
    @inject(APPLICATION_TOKENS.BeersRepository)
    private readonly beersRepository: BeersRepository,
    @inject(APPLICATION_TOKENS.CurrentUser)
    private readonly currentUser: CurrentUser,
  ) {}

  async execute(
    input: InputCreateUseCase<NewBeerDto>,
  ): OutputCreateUseCase<BeerDto> {
    const existedBeer = await this.beersRepository.exists({ name: input.name })
    if (existedBeer)
      return left(
        ApplicationError.badRequest(
          `The beer named '${input.name}' already exists.`,
        ),
      )

    const result = await Beer.create(input, this.currentUser)
    if (result.isLeft())
      return left(ApplicationError.unprocessableEntity(result.value.message))

    const beer = result.value
    await this.beersRepository.create(beer)

    return right(ApplicationResult.created(beer))
  }
}
