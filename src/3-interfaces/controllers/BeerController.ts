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
import { BeerRoutesController } from '1-domain/controllers/BeerRoutesController'
import { BeerDto, NewBeerDto, UpdateBeerDto } from '1-domain/entities/Beer/Beer'
import { APPLICATION_TOKENS } from '2-application/tokens/applicationTokens'
import { CreateBeerUseCase } from '2-application/useCases/beer/CreateBeerUseCase'
import { DeleteBeerUseCase } from '2-application/useCases/beer/DeleteBeerUseCase'
import { GetBeerUseCase } from '2-application/useCases/beer/GetBeerUseCase'
import { ListBeersUseCase } from '2-application/useCases/beer/ListBeersUseCase'
import { UpdateBeerUseCase } from '2-application/useCases/beer/UpdateBeerUseCase'

@injectable()
export class BeerController implements BeerRoutesController {
  constructor(
    @inject(APPLICATION_TOKENS.CreateBeerUseCase)
    private readonly createBeerUseCase: CreateBeerUseCase,
    @inject(APPLICATION_TOKENS.DeleteBeerUseCase)
    private readonly deleteBeerUseCase: DeleteBeerUseCase,
    @inject(APPLICATION_TOKENS.GetBeerUseCase)
    private readonly getBeerUseCase: GetBeerUseCase,
    @inject(APPLICATION_TOKENS.ListBeersUseCase)
    private readonly listBeersUseCase: ListBeersUseCase,
    @inject(APPLICATION_TOKENS.UpdateBeerUseCase)
    private readonly updateBeerUseCase: UpdateBeerUseCase,
  ) {}

  async createEntity(input: NewBeerDto): OutputCreateUseCase<NewBeerDto> {
    const result = await this.createBeerUseCase.execute(input)
    if (result.isLeft()) return left(result.value)
    return right(result.value)
  }

  async listEntities(input: InputListUseCase): OutputListUseCase<BeerDto> {
    const result = await this.listBeersUseCase.execute(input)
    if (result.isLeft()) return left(result.value)
    return right(result.value)
  }

  async getEntity(input: InputGetUseCase): OutputGetUseCase<BeerDto> {
    const result = await this.getBeerUseCase.execute(input)
    if (result.isLeft()) return left(result.value)
    return right(result.value)
  }

  async updateEntity(
    input: InputUpdateUseCase<UpdateBeerDto>,
  ): OutputUpdateUseCase<BeerDto> {
    const result = await this.updateBeerUseCase.execute(input)
    if (result.isLeft()) return left(result.value)
    return right(result.value)
  }

  async deleteEntity(input: InputDeleteUseCase): OutputDeleteUseCase {
    const result = await this.deleteBeerUseCase.execute(input)
    if (result.isLeft()) return left(result.value)
    return right(result.value)
  }
}
