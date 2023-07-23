import { inject, injectable } from 'inversify'

import { ApplicationError } from '0-core/application/result/ApplicationError'
import { ApplicationResult } from '0-core/application/result/ApplicationResult'
import {
  InputListUseCase,
  ListUseCase,
  OutputListUseCase,
} from '0-core/application/useCases/ListUseCase'
import { left, right } from '0-core/domain/result/Either'
import { BeerDto } from '1-domain/entities/Beer/Beer'
import { BeersRepository } from '2-application/repositories/BeersRepository'
import { APPLICATION_TOKENS } from '2-application/tokens/applicationTokens'

@injectable()
export class ListBeersUseCase implements ListUseCase<BeerDto> {
  constructor(
    @inject(APPLICATION_TOKENS.BeersRepository)
    private readonly BeersRepository: BeersRepository,
  ) {}

  async execute(input: InputListUseCase): OutputListUseCase<BeerDto> {
    try {
      const beers = await this.BeersRepository.list(input)
      return right(ApplicationResult.success(beers))
    } catch (error) {
      return left(ApplicationError.badRequest('Failed to list Beers.'))
    }
  }
}
