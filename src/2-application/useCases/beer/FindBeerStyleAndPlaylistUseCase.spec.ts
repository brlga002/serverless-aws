import 'reflect-metadata'

import { InputFindBeerStyleAndPlaylist } from '1-domain/controllers/BeerStyleAndPlaylistRoutesController'
import { BeersRepository } from '2-application/repositories/BeersRepository'
import {
  FakePlaylistService,
  PLAYLIST_RESULT,
} from '@test/mocks/FakePlaylistService'
import { BeersRepositoryInMemory } from '@test/repositories/in-memory/BeersRepositoryInMemory'
import { INPUT_CREATE_BEER, makeBeer } from '@test/utility/makeBeer'
import { makeBeerDto } from '@test/utility/makeBeerDto'

import { FindBeerStyleAndPlaylistUseCase } from './FindBeerStyleAndPlaylistUseCase'

const INPUT_FIND_BEER_STYLE_AND_PLAYLIST: InputFindBeerStyleAndPlaylist = {
  temperature: 1,
}

const beersRepository: BeersRepository = new BeersRepositoryInMemory()
const playlistService = new FakePlaylistService()

describe('FindBeerStyleAndPlaylistUseCase', () => {
  it('should be able to get a beer style and a playlist', async () => {
    const beer = await makeBeer({ ...INPUT_CREATE_BEER })
    const getBeerUseCase = new FindBeerStyleAndPlaylistUseCase(
      new BeersRepositoryInMemory([beer]),
      new FakePlaylistService(PLAYLIST_RESULT),
    )
    const resultUseCase = await getBeerUseCase.execute(
      INPUT_FIND_BEER_STYLE_AND_PLAYLIST,
    )

    expect.assertions(8)
    expect(resultUseCase.isRight()).toBeTruthy()
    if (resultUseCase.isRight()) {
      expect(resultUseCase.value.successCode).toBe(200)
      expect(resultUseCase.value.content).toBeTruthy()
      const beerStyleAndPlaylist = resultUseCase.value.content!
      expect(beerStyleAndPlaylist).toHaveProperty('beerStyle', 'Beer Name')
      expect(beerStyleAndPlaylist).toHaveProperty('playlist')
      expect(beerStyleAndPlaylist.playlist).toHaveProperty('name', 'IPARTY')
      expect(beerStyleAndPlaylist.playlist).toHaveProperty('tracks')
      const track = beerStyleAndPlaylist.playlist.tracks[0]
      expect(track).toMatchObject({
        name: 'Lua de Cristal',
        artist: 'Xuxa',
        link: 'https: //open.spotify.com/artist/21451j1KhjAiaYKflxBjr1',
      })
    }
  })

  it('should be able to get beer alphabetically', async () => {
    const someAverageTemperature = { minTemperature: -1, maxTemperature: 3 }
    const beers = [
      makeBeerDto({ name: 'AA BEER', ...someAverageTemperature }),
      makeBeerDto({ name: 'AB BEER', ...someAverageTemperature }),
      makeBeerDto({ name: 'ZA BEER', ...someAverageTemperature }),
    ]
    const getBeerUseCase = new FindBeerStyleAndPlaylistUseCase(
      beersRepository,
      playlistService,
    )
    const resultUseCase = getBeerUseCase.findClosestBeerStyle(
      beers,
      INPUT_FIND_BEER_STYLE_AND_PLAYLIST.temperature,
    )

    expect.assertions(2)
    expect(resultUseCase).toBeTruthy()
    expect(resultUseCase!.name).toBe('AA BEER')
  })

  it('should be able to get more proper beer', async () => {
    const beers = [
      makeBeerDto({ name: 'AA BEER', minTemperature: -2, maxTemperature: 8 }),
      makeBeerDto({ name: 'RC BEER', minTemperature: -2, maxTemperature: 7 }),
      makeBeerDto({ name: 'ZA BEER', minTemperature: -2, maxTemperature: 5 }),
    ]
    const getBeerUseCase = new FindBeerStyleAndPlaylistUseCase(
      beersRepository,
      playlistService,
    )
    const resultUseCase = getBeerUseCase.findClosestBeerStyle(beers, 2)

    expect.assertions(2)
    expect(resultUseCase).toBeTruthy()
    expect(resultUseCase!.name).toBe('RC BEER')
  })

  it('should throw an error when beer style not found', async () => {
    const getBeerUseCase = new FindBeerStyleAndPlaylistUseCase(
      beersRepository,
      playlistService,
    )
    const resultUseCase = await getBeerUseCase.execute(
      INPUT_FIND_BEER_STYLE_AND_PLAYLIST,
    )

    expect.assertions(3)
    expect(resultUseCase.isLeft()).toBeTruthy()
    if (resultUseCase.isLeft()) {
      expect(resultUseCase.value.errorCode).toBe(404)
      expect(resultUseCase.value.error).toBe(
        `Beer style with temperature '${INPUT_FIND_BEER_STYLE_AND_PLAYLIST.temperature}' not found.`,
      )
    }
  })

  it('should throw an error when playlist not found', async () => {
    const beer = await makeBeer({ ...INPUT_CREATE_BEER })
    const getBeerUseCase = new FindBeerStyleAndPlaylistUseCase(
      new BeersRepositoryInMemory([beer]),
      playlistService,
    )
    const resultUseCase = await getBeerUseCase.execute(
      INPUT_FIND_BEER_STYLE_AND_PLAYLIST,
    )

    expect.assertions(3)
    expect(resultUseCase.isLeft()).toBeTruthy()
    if (resultUseCase.isLeft()) {
      expect(resultUseCase.value.errorCode).toBe(404)
      expect(resultUseCase.value.error).toBe(
        `Playlist for beer style '${INPUT_CREATE_BEER.name}' not found.`,
      )
    }
  })
})
