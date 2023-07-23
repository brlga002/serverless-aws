import 'reflect-metadata'

import { BeersRepository } from '2-application/repositories/BeersRepository'
import { BeersRepositoryInMemory } from '@test/repositories/in-memory/BeersRepositoryInMemory'
import { INPUT_CREATE_BEER, makeBeer } from '@test/utility/makeBeer'

import { GetBeerUseCase } from './GetBeerUseCase'

const INPUT_GET_BEER = {
  id: 'some-valid-beer-id',
}

describe('GetBeerUseCase', () => {
  it('should be able to get an beer', async () => {
    const beer = await makeBeer({ ...INPUT_CREATE_BEER, id: INPUT_GET_BEER.id })
    const beersRepository: BeersRepository = new BeersRepositoryInMemory([beer])
    const getBeerUseCase = new GetBeerUseCase(beersRepository)

    const resultUseCase = await getBeerUseCase.execute(INPUT_GET_BEER)

    expect.assertions(9)
    expect(resultUseCase.isRight()).toBeTruthy()

    if (resultUseCase.isRight()) {
      expect(resultUseCase.value.successCode).toBe(200)
      expect(resultUseCase.value.content).toBeTruthy()
      const beer = resultUseCase.value.content!
      expect(beer).toHaveProperty('id')
      expect(beer).toHaveProperty('createdAt')
      expect(beer).toHaveProperty('createdBy')
      expect(beer).toHaveProperty('updatedAt')
      expect(beer).toHaveProperty('updatedBy')
      expect(beer).toMatchObject({
        name: INPUT_CREATE_BEER.name,
        minTemperature: INPUT_CREATE_BEER.minTemperature,
        maxTemperature: INPUT_CREATE_BEER.maxTemperature,
      })
    }
  })

  it('should throw an error when beer not found', async () => {
    const beersRepository: BeersRepository = new BeersRepositoryInMemory()
    const getBeerUseCase = new GetBeerUseCase(beersRepository)

    const resultUseCase = await getBeerUseCase.execute(INPUT_GET_BEER)

    expect.assertions(3)
    expect(resultUseCase.isLeft()).toBeTruthy()

    if (resultUseCase.isLeft()) {
      expect(resultUseCase.value.errorCode).toBe(404)
      expect(resultUseCase.value.error).toBe(
        `Beer with id '${INPUT_GET_BEER.id}' was not found.`,
      )
    }
  })
})
