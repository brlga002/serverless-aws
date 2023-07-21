import 'reflect-metadata'

import { InputListRepository } from '0-core/application/repositories/Repository'
import { UsersRepository } from '2-application/repositories/UsersRepository'
import { UsersRepositoryInMemory } from '@test/repositories/in-memory/UsersRepositoryInMemory'
import { makeUser } from '@test/utility/makeUser'

import { ListUsersUseCase } from './ListUsersUseCase'

const INPUT_LIST_USERS: InputListRepository = {
  offset: 1,
  limit: 2,
}

describe('ListUsersUseCase', () => {
  it('should be able to list users', async () => {
    const usersRepository: UsersRepository = new UsersRepositoryInMemory([
      await makeUser({ name: 'first name' }),
      await makeUser({ name: 'second name' }),
      await makeUser({ name: 'third name' }),
    ])
    const listUsersUseCase = new ListUsersUseCase(usersRepository)

    const resultUseCase = await listUsersUseCase.execute(INPUT_LIST_USERS)

    expect.assertions(15)
    expect(resultUseCase.isRight()).toBeTruthy()

    if (resultUseCase.isRight()) {
      expect(resultUseCase.value.successCode).toBe(200)
      expect(resultUseCase.value.content).toBeTruthy()
      const user = resultUseCase.value.content!
      expect(user).toHaveProperty('data')
      expect(user).toHaveProperty('limit', INPUT_LIST_USERS.limit)
      expect(user).toHaveProperty('offset', INPUT_LIST_USERS.offset)
      expect(user).toHaveProperty('total', 3)

      expect(user.data[0]).toHaveProperty('id')
      expect(user.data[0]).toHaveProperty('createdAt')
      expect(user.data[0]).toHaveProperty('createdBy')
      expect(user.data[0]).toHaveProperty('updatedAt')
      expect(user.data[0]).toHaveProperty('updatedBy')
      expect(user.data[0]).not.toHaveProperty('password')
      expect(user.data[0].name).toBe('third name')
      expect(user.data[0]).not.toHaveProperty('password')
    }
  })
})
