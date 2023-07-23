import {
  InputListRepository,
  OutputListRepository,
} from '0-core/application/repositories/Repository'
import { Entity } from '0-core/domain/entities/Entity'
import { CurrentUser } from '1-domain/auth/CurrentUser'
import { Beer, BeerDto } from '1-domain/entities/Beer/Beer'
import { BeersRepository } from '2-application/repositories/BeersRepository'

export class BeersRepositoryInMemory implements BeersRepository {
  private beers!: Beer[]

  constructor(beers: Beer[] = []) {
    this.beers = beers
  }

  findBeersByTemperatureRangeSortedByName(
    temperature: number,
  ): Promise<BeerDto[]> {
    const filteredBeers = this.beers.filter((beer) => {
      return (
        beer.props.minTemperature <= temperature &&
        beer.props.maxTemperature >= temperature
      )
    })

    return Promise.resolve(filteredBeers.map((beer) => beer.toJSON(true)))
  }

  create(entity: Beer): Promise<void> {
    this.beers.push(entity)
    return Promise.resolve()
  }

  delete(id: string): Promise<boolean> {
    const index = this.beers.findIndex((u) => u.props.id === id)
    if (index !== -1) {
      this.beers.splice(index, 1)
      return Promise.resolve(true)
    }
    return Promise.resolve(false)
  }

  exists(filter: Record<string, unknown>): Promise<boolean> {
    const foundUser = this.beers.find((u) => {
      for (const key in filter) {
        if (u.props[key as unknown as keyof BeerDto] !== filter[key]) {
          return false
        }
      }
      return true
    })
    return Promise.resolve(!!foundUser)
  }

  findOne(data: Record<string, unknown>): Promise<Beer | null> {
    const foundUser = this.beers.find((u) => {
      for (const key in data) {
        if (u.props[key as unknown as keyof BeerDto] !== data[key]) {
          return false
        }
      }
      return true
    })
    return Promise.resolve(foundUser ?? null)
  }

  getById(id: string): Promise<Beer | null> {
    const beer = this.beers.find((u) => u.props.id === id)
    return Promise.resolve(beer ?? null)
  }

  list(input: InputListRepository): Promise<OutputListRepository<BeerDto>> {
    const { offset = 0, limit = 10 } = input
    const startIndex = offset * limit
    const endIndex = startIndex + limit

    const filteredUsers = this.beers.slice(startIndex, endIndex)

    const output: OutputListRepository<BeerDto> = {
      data: filteredUsers.map((beer) => beer.toJSON(true)),
      limit,
      offset,
      total: this.beers.length,
    }

    return Promise.resolve(output)
  }

  async update(id: string, entity: Entity<unknown>): Promise<Beer | null> {
    const beer = this.beers.find((u) => u.props.id === id)
    const currentUser: CurrentUser = {
      userId: 'valid-user-id',
    }
    if (beer) {
      const updatedUser = await Beer.create(
        {
          ...beer.props,
          ...entity,
        },
        currentUser,
      )
      if (updatedUser.isLeft()) return Promise.resolve(null)

      return Promise.resolve(updatedUser.value)
    }

    return Promise.resolve(null)
  }
}
