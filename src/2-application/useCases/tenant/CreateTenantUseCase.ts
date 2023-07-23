import { inject, injectable } from 'inversify'

import { ApplicationError } from '0-core/application/result/ApplicationError'
import { ApplicationResult } from '0-core/application/result/ApplicationResult'
import {
  CreateUseCase,
  InputCreateUseCase,
  OutputCreateUseCase,
} from '0-core/application/useCases/CreateUseCase'
import { left, right } from '0-core/domain/result/Either'
import {
  NewTenantDto,
  Tenant,
  TenantDto,
} from '1-domain/entities/Tenant/Tenant'
import { TenantsRepository } from '2-application/repositories/TenantsRepository'
import { APPLICATION_TOKENS } from '2-application/tokens/applicationTokens'

@injectable()
export class CreateTenantUseCase implements CreateUseCase<TenantDto> {
  constructor(
    @inject(APPLICATION_TOKENS.TenantsRepository)
    private readonly tenantsRepository: TenantsRepository,
  ) {}

  async execute(
    input: InputCreateUseCase<NewTenantDto>,
  ): OutputCreateUseCase<TenantDto> {
    const tenant = await this.tenantsRepository.findOne({ email: input.email })
    if (tenant)
      return left(
        ApplicationError.badRequest(
          `The email: ${input.email}  is already in use by another Tenant.`,
        ),
      )

    const result = Tenant.create(input)
    if (result.isLeft())
      return left(ApplicationError.unprocessableEntity(result.value.message))

    const newTenant = result.value
    await this.tenantsRepository.create(newTenant)

    return right(ApplicationResult.created(newTenant))
  }
}
