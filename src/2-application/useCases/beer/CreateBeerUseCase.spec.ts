import 'reflect-metadata'

import { InputCreateUseCase } from '0-core/application/useCases/CreateUseCase'
import { NewBeerDto } from '1-domain/entities/Beer/Beer'
import { BeersRepository } from '2-application/repositories/BeersRepository'
import { BeersRepositoryInMemory } from '@test/repositories/in-memory/BeersRepositoryInMemory'
import { CURRENT_USER } from '@test/utility/currentUser'
import { makeBeer } from '@test/utility/makeBeer'

import { CreateBeerUseCase } from './CreateBeerUseCase'

const INPUT_CREATE_BEER: InputCreateUseCase<NewBeerDto> = {
  name: 'Beer Name',
  minTemperature: -2,
  maxTemperature: 2,
}

describe('CreateBeerUseCase', () => {
  it('should be able to create a new beer', async () => {
    const beersRepository: BeersRepository = new BeersRepositoryInMemory()
    const createBeerUseCase = new CreateBeerUseCase(
      beersRepository,
      CURRENT_USER,
    )

    const resultUseCase = await createBeerUseCase.execute(INPUT_CREATE_BEER)

    expect.assertions(9)
    expect(resultUseCase.isRight()).toBeTruthy()

    if (resultUseCase.isRight()) {
      expect(resultUseCase.value.successCode).toBe(201)
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
        averageTemperature: 0,
      })
    }
  })

  it('should throw an error when min temperature is invalid', async () => {
    const beersRepository: BeersRepository = new BeersRepositoryInMemory()
    const createBeerUseCase = new CreateBeerUseCase(
      beersRepository,
      CURRENT_USER,
    )

    const resultUseCase = await createBeerUseCase.execute({
      ...INPUT_CREATE_BEER,
      minTemperature: 3,
    })

    expect.assertions(3)
    expect(resultUseCase.isLeft()).toBeTruthy()

    if (resultUseCase.isLeft()) {
      expect(resultUseCase.value.errorCode).toBe(422)
      expect(resultUseCase.value.error).toBe(
        `The minimum temperature cannot be higher than the maximum temperature.`,
      )
    }
  })

  it('should throw an error when name is in use', async () => {
    const beer = await makeBeer(INPUT_CREATE_BEER)
    const beersRepository: BeersRepository = new BeersRepositoryInMemory([beer])
    const createUserUseCase = new CreateBeerUseCase(
      beersRepository,
      CURRENT_USER,
    )

    const resultUseCase = await createUserUseCase.execute(INPUT_CREATE_BEER)

    expect.assertions(3)
    expect(resultUseCase.isLeft()).toBeTruthy()

    if (resultUseCase.isLeft()) {
      expect(resultUseCase.value.errorCode).toBe(400)
      expect(resultUseCase.value.error).toBe(
        `The beer named '${INPUT_CREATE_BEER.name}' already exists.`,
      )
    }
  })
})
