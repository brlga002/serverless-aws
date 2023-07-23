import { inject, injectable } from 'inversify'

import { ApplicationError } from '0-core/application/result/ApplicationError'
import { ApplicationResult } from '0-core/application/result/ApplicationResult'
import {
  GetUseCase,
  InputGetUseCase,
  OutputGetUseCase,
} from '0-core/application/useCases/GetUseCase'
import { left, right } from '0-core/domain/result/Either'
import { BeerDto } from '1-domain/entities/Beer/Beer'
import { BeersRepository } from '2-application/repositories/BeersRepository'
import { APPLICATION_TOKENS } from '2-application/tokens/applicationTokens'

@injectable()
export class GetBeerUseCase implements GetUseCase<BeerDto> {
  constructor(
    @inject(APPLICATION_TOKENS.BeersRepository)
    private readonly beersRepository: BeersRepository,
  ) {}

  async execute(input: InputGetUseCase): OutputGetUseCase<BeerDto> {
    const beer = await this.beersRepository.getById(input.id)
    if (!beer)
      return left(
        ApplicationError.notFound(`Beer with id '${input.id}' was not found.`),
      )
    return right(ApplicationResult.success<BeerDto>(beer))
  }
}
