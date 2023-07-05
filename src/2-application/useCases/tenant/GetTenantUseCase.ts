import { inject, injectable } from 'inversify'

import { ApplicationError } from '0-core/application/result/ApplicationError'
import { ApplicationResult } from '0-core/application/result/ApplicationResult'
import {
  GetUseCase,
  InputGetUseCase,
  OutputGetUseCase,
} from '0-core/application/useCases/GetUseCase'
import { left, right } from '0-core/domain/result/Either'
import { TenantDto } from '1-domain/entities/Tenant/Tenant'
import { TenantsRepository } from '2-application/repositories/TenantsRepository'
import { APPLICATION_TOKENS } from '2-application/tokens/applicationTokens'

@injectable()
export class GetTenantUseCase implements GetUseCase<TenantDto> {
  constructor(
    @inject(APPLICATION_TOKENS.TenantsRepository)
    private readonly tenantsRepository: TenantsRepository,
  ) {}

  async execute(input: InputGetUseCase): OutputGetUseCase<TenantDto> {
    const user = await this.tenantsRepository.getById(input.id)
    if (!user) return left(ApplicationError.notFound())
    return right(ApplicationResult.success(user.toJSON()))
  }
}
