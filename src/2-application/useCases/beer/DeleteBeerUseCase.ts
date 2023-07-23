import { inject, injectable } from 'inversify'

import { ApplicationError } from '0-core/application/result/ApplicationError'
import { ApplicationResult } from '0-core/application/result/ApplicationResult'
import {
  DeleteUseCase,
  InputDeleteUseCase,
  OutputDeleteUseCase,
} from '0-core/application/useCases/DeleteUseCase'
import { left, right } from '0-core/domain/result/Either'
import { BeersRepository } from '2-application/repositories/BeersRepository'
import { APPLICATION_TOKENS } from '2-application/tokens/applicationTokens'

@injectable()
export class DeleteBeerUseCase implements DeleteUseCase {
  constructor(
    @inject(APPLICATION_TOKENS.BeersRepository)
    private readonly beersRepository: BeersRepository,
  ) {}

  async execute(input: InputDeleteUseCase): OutputDeleteUseCase {
    const beer = await this.beersRepository.getById(input.id)
    if (!beer)
      return left(
        ApplicationError.notFound(`Beer with id '${input.id}' was not found.`),
      )

    const result = await this.beersRepository.delete(input.id)
    if (!result)
      return left(
        ApplicationError.internalServerError('Failed to delete Beer.'),
      )
    return right(ApplicationResult.noContent())
  }
}
