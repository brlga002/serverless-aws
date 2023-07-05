import { inject, injectable } from 'inversify'

import { ApplicationError } from '0-core/application/result/ApplicationError'
import { ApplicationResult } from '0-core/application/result/ApplicationResult'
import {
  InputUpdateUseCase,
  OutputUpdateUseCase,
  UpdateUseCase,
} from '0-core/application/useCases/UpdateUseCase'
import { left, right } from '0-core/domain/result/Either'
import { TenantDto, UpdateTenantDto } from '1-domain/entities/Tenant/Tenant'
import { TenantsRepository } from '2-application/repositories/TenantsRepository'
import { APPLICATION_TOKENS } from '2-application/tokens/applicationTokens'

@injectable()
export class UpdateTenantUseCase implements UpdateUseCase<UpdateTenantDto> {
  constructor(
    @inject(APPLICATION_TOKENS.TenantsRepository)
    private readonly tenantsRepository: TenantsRepository,
  ) {}

  async execute(
    input: InputUpdateUseCase<UpdateTenantDto>,
  ): OutputUpdateUseCase<TenantDto> {
    const tenant = await this.tenantsRepository.getById(input.id)
    if (!tenant)
      return left(
        ApplicationError.notFound(
          `Tenant with id '${input.id}' was not found.`,
        ),
      )

    tenant.props.name = input.name

    await this.tenantsRepository.update(input.id, tenant)

    return right(ApplicationResult.success(tenant.toJSON()))
  }
}
