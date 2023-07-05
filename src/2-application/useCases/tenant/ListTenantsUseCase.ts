import { inject, injectable } from 'inversify'

import { ApplicationError } from '0-core/application/result/ApplicationError'
import { ApplicationResult } from '0-core/application/result/ApplicationResult'
import {
  InputListUseCase,
  ListUseCase,
  OutputListUseCase,
} from '0-core/application/useCases/ListUseCase'
import { left, right } from '0-core/domain/result/Either'
import { TenantDto } from '1-domain/entities/Tenant/Tenant'
import { TenantsRepository } from '2-application/repositories/TenantsRepository'
import { APPLICATION_TOKENS } from '2-application/tokens/applicationTokens'

@injectable()
export class ListTenantsUseCase implements ListUseCase<TenantDto> {
  constructor(
    @inject(APPLICATION_TOKENS.TenantsRepository)
    private readonly tenantsRepository: TenantsRepository,
  ) {}

  async execute(input: InputListUseCase): OutputListUseCase<TenantDto> {
    try {
      const users = await this.tenantsRepository.list(input)
      return right(ApplicationResult.success(users))
    } catch (error) {
      return left(ApplicationError.badRequest())
    }
  }
}
