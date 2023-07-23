import { inject, injectable } from 'inversify'

import { left, right } from '0-core/domain/result/Either'
import {
  BeerStyleAndPlaylistRoutesController,
  InputFindBeerStyleAndPlaylist,
  OutputFindBeerStyleAndPlaylist,
} from '1-domain/controllers/BeerStyleAndPlaylistRoutesController'
import { APPLICATION_TOKENS } from '2-application/tokens/applicationTokens'
import { FindBeerStyleAndPlaylistUseCase } from '2-application/useCases/beer/FindBeerStyleAndPlaylistUseCase'

@injectable()
export class BeerStyleAndPlaylistController
  implements BeerStyleAndPlaylistRoutesController
{
  constructor(
    @inject(APPLICATION_TOKENS.FindBeerStyleAndPlaylistUseCase)
    private readonly findBeerStyleAndPlaylistUseCase: FindBeerStyleAndPlaylistUseCase,
  ) {}

  async findBeerStyleAndPlaylist(
    input: InputFindBeerStyleAndPlaylist,
  ): OutputFindBeerStyleAndPlaylist {
    const result = await this.findBeerStyleAndPlaylistUseCase.execute(input)
    if (result.isLeft()) return left(result.value)
    return right(result.value)
  }
}
