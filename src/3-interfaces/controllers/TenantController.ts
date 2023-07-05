import { inject, injectable } from 'inversify'

import { OutputCreateUseCase } from '0-core/application/useCases/CreateUseCase'
import {
  InputDeleteUseCase,
  OutputDeleteUseCase,
} from '0-core/application/useCases/DeleteUseCase'
import {
  InputGetUseCase,
  OutputGetUseCase,
} from '0-core/application/useCases/GetUseCase'
import {
  InputListUseCase,
  OutputListUseCase,
} from '0-core/application/useCases/ListUseCase'
import {
  InputUpdateUseCase,
  OutputUpdateUseCase,
} from '0-core/application/useCases/UpdateUseCase'
import { left, right } from '0-core/domain/result/Either'
import { TenantRoutesController } from '1-domain/controllers/TenantRoutesController'
import {
  NewTenantDto,
  TenantDto,
  UpdateTenantDto,
} from '1-domain/entities/Tenant/Tenant'
import { APPLICATION_TOKENS } from '2-application/tokens/applicationTokens'
import { CreateTenantUseCase } from '2-application/useCases/tenant/CreateTenantUseCase'
import { DeleteTenantUseCase } from '2-application/useCases/tenant/DeleteTenantUseCase'
import { GetTenantUseCase } from '2-application/useCases/tenant/GetTenantUseCase'
import { ListTenantsUseCase } from '2-application/useCases/tenant/ListTenantsUseCase'
import { UpdateTenantUseCase } from '2-application/useCases/tenant/UpdateTenantUseCase'

@injectable()
export class TenantController implements TenantRoutesController {
  constructor(
    @inject(APPLICATION_TOKENS.CreateTenantUseCase)
    private readonly createTenantUseCase: CreateTenantUseCase,
    @inject(APPLICATION_TOKENS.DeleteTenantUseCase)
    private readonly deleteTenantUseCase: DeleteTenantUseCase,
    @inject(APPLICATION_TOKENS.GetTenantUseCase)
    private readonly getTenantUseCase: GetTenantUseCase,
    @inject(APPLICATION_TOKENS.ListTenantsUseCase)
    private readonly listTenantsUseCase: ListTenantsUseCase,
    @inject(APPLICATION_TOKENS.UpdateTenantUseCase)
    private readonly updateTenantUseCase: UpdateTenantUseCase,
  ) {}

  async createEntity(input: NewTenantDto): OutputCreateUseCase<NewTenantDto> {
    const result = await this.createTenantUseCase.execute(input)
    if (result.isLeft()) return left(result.value)
    return right(result.value)
  }

  async listEntities(input: InputListUseCase): OutputListUseCase<TenantDto> {
    const result = await this.listTenantsUseCase.execute(input)
    if (result.isLeft()) return left(result.value)
    return right(result.value)
  }

  async getEntity(input: InputGetUseCase): OutputGetUseCase<TenantDto> {
    const result = await this.getTenantUseCase.execute(input)
    if (result.isLeft()) return left(result.value)
    return right(result.value)
  }

  async updateEntity(
    input: InputUpdateUseCase<UpdateTenantDto>,
  ): OutputUpdateUseCase<TenantDto> {
    const result = await this.updateTenantUseCase.execute(input)
    if (result.isLeft()) return left(result.value)
    return right(result.value)
  }

  async deleteEntity(input: InputDeleteUseCase): OutputDeleteUseCase {
    const result = await this.deleteTenantUseCase.execute(input)
    if (result.isLeft()) return left(result.value)
    return right(result.value)
  }
}
