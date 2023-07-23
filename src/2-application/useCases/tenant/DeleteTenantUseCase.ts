import { inject, injectable } from 'inversify'

import { ApplicationError } from '0-core/application/result/ApplicationError'
import { ApplicationResult } from '0-core/application/result/ApplicationResult'
import {
  DeleteUseCase,
  InputDeleteUseCase,
  OutputDeleteUseCase,
} from '0-core/application/useCases/DeleteUseCase'
import { left, right } from '0-core/domain/result/Either'
import { TenantsRepository } from '2-application/repositories/TenantsRepository'
import { APPLICATION_TOKENS } from '2-application/tokens/applicationTokens'

@injectable()
export class DeleteTenantUseCase implements DeleteUseCase {
  constructor(
    @inject(APPLICATION_TOKENS.TenantsRepository)
    private readonly tenantsRepository: TenantsRepository,
  ) {}

  async execute(input: InputDeleteUseCase): OutputDeleteUseCase {
    const result = await this.tenantsRepository.delete(input.id)
    if (!result) return left(ApplicationError.internalServerError())
    return right(ApplicationResult.success(result))
  }
}
