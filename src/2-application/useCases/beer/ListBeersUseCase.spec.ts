import 'reflect-metadata'

import { InputListRepository } from '0-core/application/repositories/Repository'
import { BeersRepository } from '2-application/repositories/BeersRepository'
import { BeersRepositoryInMemory } from '@test/repositories/in-memory/BeersRepositoryInMemory'
import { makeBeer } from '@test/utility/makeBeer'

import { ListBeersUseCase } from './ListBeersUseCase'

const INPUT_GET_USER: InputListRepository = {
  offset: 1,
  limit: 2,
}

describe('ListBeersUseCase', () => {
  it('should be able to list beers', async () => {
    const beersRepository: BeersRepository = new BeersRepositoryInMemory([
      await makeBeer({ name: 'first name' }),
      await makeBeer({ name: 'second name' }),
      await makeBeer({ name: 'third name' }),
    ])
    const listBeersUseCase = new ListBeersUseCase(beersRepository)

    const resultUseCase = await listBeersUseCase.execute(INPUT_GET_USER)

    expect(resultUseCase.isRight()).toBeTruthy()

    if (resultUseCase.isRight()) {
      expect(resultUseCase.value.successCode).toBe(200)
      expect(resultUseCase.value.content).toBeTruthy()
      const beer = resultUseCase.value.content!
      expect(beer).toHaveProperty('data')
      expect(beer).toHaveProperty('limit', INPUT_GET_USER.limit)
      expect(beer).toHaveProperty('offset', INPUT_GET_USER.offset)
      expect(beer).toHaveProperty('total', 3)

      expect(beer.data[0]).toHaveProperty('id')
      expect(beer.data[0]).toHaveProperty('createdAt')
      expect(beer.data[0]).toHaveProperty('createdBy')
      expect(beer.data[0]).toHaveProperty('updatedAt')
      expect(beer.data[0]).toHaveProperty('updatedBy')
      expect(beer.data[0]).not.toHaveProperty('password')
      expect(beer.data[0].name).toBe('third name')
    }
  })
})
