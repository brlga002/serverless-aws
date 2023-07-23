import 'reflect-metadata'

import { BeersRepository } from '2-application/repositories/BeersRepository'
import { BeersRepositoryInMemory } from '@test/repositories/in-memory/BeersRepositoryInMemory'
import { makeBeer } from '@test/utility/makeBeer'

import { DeleteBeerUseCase } from './DeleteBeerUseCase'

const INPUT_DELETE_BEER = {
  id: 'valid-beer-id',
}

describe('DeleteBeerUseCase', () => {
  it('should be able to delete an beer', async () => {
    const beer = await makeBeer({ id: INPUT_DELETE_BEER.id })
    const beersRepository: BeersRepository = new BeersRepositoryInMemory([beer])
    const deleteBeerUseCase = new DeleteBeerUseCase(beersRepository)

    const resultUseCase = await deleteBeerUseCase.execute(INPUT_DELETE_BEER)

    expect.assertions(3)
    expect(resultUseCase.isRight()).toBeTruthy()

    if (resultUseCase.isRight()) {
      expect(resultUseCase.value.successCode).toBe(204)
      expect(resultUseCase.value.content).toBe(true)
    }
  })

  it('should throw an error when beer not found', async () => {
    const beersRepository: BeersRepository = new BeersRepositoryInMemory()
    const deleteBeerUseCase = new DeleteBeerUseCase(beersRepository)

    const resultUseCase = await deleteBeerUseCase.execute(INPUT_DELETE_BEER)

    expect.assertions(3)
    expect(resultUseCase.isLeft()).toBeTruthy()

    if (resultUseCase.isLeft()) {
      expect(resultUseCase.value.errorCode).toBe(404)
      expect(resultUseCase.value.error).toBe(
        `Beer with id '${INPUT_DELETE_BEER.id}' was not found.`,
      )
    }
  })
})
