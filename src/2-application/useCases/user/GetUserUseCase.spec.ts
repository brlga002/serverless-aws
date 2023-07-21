import 'reflect-metadata'

import { UsersRepository } from '2-application/repositories/UsersRepository'
import { UsersRepositoryInMemory } from '@test/repositories/in-memory/UsersRepositoryInMemory'
import { INPUT_CREATE_USER, makeUser } from '@test/utility/makeUser'

import { GetUserUseCase } from './GetUserUseCase'

const INPUT_GET_USER = {
  id: 'd3f87c05-5efb-4850-8b91-33676fa87748',
}

describe('GetUserUseCase', () => {
  it('should be able to get an user', async () => {
    const user = await makeUser({ ...INPUT_CREATE_USER, id: INPUT_GET_USER.id })
    const usersRepository: UsersRepository = new UsersRepositoryInMemory([user])
    const getUserUseCase = new GetUserUseCase(usersRepository)

    const resultUseCase = await getUserUseCase.execute(INPUT_GET_USER)

    expect.assertions(10)
    expect(resultUseCase.isRight()).toBeTruthy()

    if (resultUseCase.isRight()) {
      expect(resultUseCase.value.successCode).toBe(200)
      expect(resultUseCase.value.content).toBeTruthy()
      const user = resultUseCase.value.content!
      expect(user).toHaveProperty('id')
      expect(user).toHaveProperty('createdAt')
      expect(user).toHaveProperty('createdBy')
      expect(user).toHaveProperty('updatedAt')
      expect(user).toHaveProperty('updatedBy')
      expect(user).toMatchObject({
        name: INPUT_CREATE_USER.name,
        email: INPUT_CREATE_USER.email,
      })
      expect(user).not.toHaveProperty('password')
    }
  })

  it('should throw an error when user not found', async () => {
    const usersRepository: UsersRepository = new UsersRepositoryInMemory()
    const getUserUseCase = new GetUserUseCase(usersRepository)

    const resultUseCase = await getUserUseCase.execute(INPUT_GET_USER)

    expect.assertions(3)
    expect(resultUseCase.isLeft()).toBeTruthy()

    if (resultUseCase.isLeft()) {
      expect(resultUseCase.value.errorCode).toBe(404)
      expect(resultUseCase.value.error).toBe(
        `User with id '${INPUT_GET_USER.id}' was not found.`,
      )
    }
  })
})
