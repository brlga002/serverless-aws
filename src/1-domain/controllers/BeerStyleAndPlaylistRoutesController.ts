import { ApplicationError } from '0-core/application/result/ApplicationError'
import { ApplicationResult } from '0-core/application/result/ApplicationResult'
import { Either } from '0-core/domain/result/Either'
import { Playlist } from '1-domain/services/PlaylistService'

export type InputFindBeerStyleAndPlaylist = {
  temperature: number
}

export type ResponseFindBeerStyleAndPlaylist = {
  beerStyle: string
  playlist: Playlist
}

export type OutputFindBeerStyleAndPlaylist = Promise<
  Either<ApplicationError, ApplicationResult<ResponseFindBeerStyleAndPlaylist>>
>

export interface BeerStyleAndPlaylistRoutesController {
  findBeerStyleAndPlaylist(
    input: InputFindBeerStyleAndPlaylist,
  ): OutputFindBeerStyleAndPlaylist
}
