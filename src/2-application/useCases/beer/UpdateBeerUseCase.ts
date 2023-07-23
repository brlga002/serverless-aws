import { inject, injectable } from 'inversify'

import { ApplicationError } from '0-core/application/result/ApplicationError'
import { ApplicationResult } from '0-core/application/result/ApplicationResult'
import {
  InputUpdateUseCase,
  OutputUpdateUseCase,
  UpdateUseCase,
} from '0-core/application/useCases/UpdateUseCase'
import { left, right } from '0-core/domain/result/Either'
import { BeerDto, UpdateBeerDto } from '1-domain/entities/Beer/Beer'
import { BeersRepository } from '2-application/repositories/BeersRepository'
import { APPLICATION_TOKENS } from '2-application/tokens/applicationTokens'

@injectable()
export class UpdateBeerUseCase implements UpdateUseCase<UpdateBeerDto> {
  constructor(
    @inject(APPLICATION_TOKENS.BeersRepository)
    private readonly beersRepository: BeersRepository,
  ) {}

  async execute(
    input: InputUpdateUseCase<UpdateBeerDto>,
  ): OutputUpdateUseCase<BeerDto> {
    const beer = await this.beersRepository.getById(input.id)
    if (!beer)
      return left(
        ApplicationError.notFound(`Beer with id '${input.id}' was not found.`),
      )

    if (input.name) beer.props.name = input.name
    if (input.minTemperature) beer.props.minTemperature = input.minTemperature
    if (input.maxTemperature) beer.props.maxTemperature = input.maxTemperature

    const result = await this.beersRepository.update(input.id, beer)
    if (!result)
      return left(
        ApplicationError.internalServerError('Failed to update Beer.'),
      )

    return right(ApplicationResult.success<BeerDto>(beer))
  }
}
