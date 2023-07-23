import { inject, injectable } from 'inversify'

import { ApplicationError } from '0-core/application/result/ApplicationError'
import { ApplicationResult } from '0-core/application/result/ApplicationResult'
import { BaseUseCase } from '0-core/application/useCases/BaseUseCase'
import { left, right } from '0-core/domain/result/Either'
import {
  InputFindBeerStyleAndPlaylist,
  OutputFindBeerStyleAndPlaylist,
} from '1-domain/controllers/BeerStyleAndPlaylistRoutesController'
import { BeerDto } from '1-domain/entities/Beer/Beer'
import { PlaylistService } from '1-domain/services/PlaylistService'
import { BeersRepository } from '2-application/repositories/BeersRepository'
import { APPLICATION_TOKENS } from '2-application/tokens/applicationTokens'

@injectable()
export class FindBeerStyleAndPlaylistUseCase
  implements
    BaseUseCase<InputFindBeerStyleAndPlaylist, OutputFindBeerStyleAndPlaylist>
{
  constructor(
    @inject(APPLICATION_TOKENS.BeersRepository)
    private readonly beersRepository: BeersRepository,
    @inject(APPLICATION_TOKENS.PlaylistService)
    private readonly playlistService: PlaylistService,
  ) {}

  async execute(
    input: InputFindBeerStyleAndPlaylist,
  ): OutputFindBeerStyleAndPlaylist {
    const beers =
      await this.beersRepository.findBeersByTemperatureRangeSortedByName(
        input.temperature,
      )
    const beerStyle = this.findClosestBeerStyle(beers, input.temperature)
    if (!beerStyle)
      return left(
        ApplicationError.notFound(
          `Beer style with temperature '${input.temperature}' not found.`,
        ),
      )

    const playlist = await this.playlistService.searchPlaylist(beerStyle.name)
    if (!playlist)
      return left(
        ApplicationError.notFound(
          `Playlist for beer style '${beerStyle.name}' not found.`,
        ),
      )

    return right(
      ApplicationResult.success({
        beerStyle: beerStyle.name,
        playlist,
      }),
    )
  }

  findClosestBeerStyle(beers: BeerDto[], temperature: number): BeerDto | null {
    if (beers.length === 0) return null

    let closestDifference = Number.MAX_SAFE_INTEGER
    let closestStyle: BeerDto | null = null

    for (const style of beers) {
      const difference = Math.abs(style.averageTemperature - temperature)

      if (difference < closestDifference) {
        closestStyle = style
        closestDifference = difference
      }
    }

    return closestStyle
  }
}
