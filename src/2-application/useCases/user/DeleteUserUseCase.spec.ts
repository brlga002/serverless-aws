import 'reflect-metadata'

import { UsersRepository } from '2-application/repositories/UsersRepository'
import { UsersRepositoryInMemory } from '@test/repositories/in-memory/UsersRepositoryInMemory'
import { makeUser } from '@test/utility/makeUser'

import { DeleteUserUseCase } from './DeleteUserUseCase'

const INPUT_DELETE_USER = {
  id: 'd3f87c05-5efb-4850-8b91-33676fa87748',
}

describe('DeleteUserUseCase', () => {
  it('should be able to delete an user', async () => {
    const user = await makeUser({ id: INPUT_DELETE_USER.id })
    const usersRepository: UsersRepository = new UsersRepositoryInMemory([user])
    const deleteUserUseCase = new DeleteUserUseCase(usersRepository)

    const resultUseCase = await deleteUserUseCase.execute(INPUT_DELETE_USER)

    expect.assertions(3)
    expect(resultUseCase.isRight()).toBeTruthy()

    if (resultUseCase.isRight()) {
      expect(resultUseCase.value.successCode).toBe(204)
      expect(resultUseCase.value.content).toBe(true)
    }
  })

  it('should throw an error when user not found', async () => {
    const usersRepository: UsersRepository = new UsersRepositoryInMemory()
    const deleteUserUseCase = new DeleteUserUseCase(usersRepository)

    const resultUseCase = await deleteUserUseCase.execute(INPUT_DELETE_USER)

    expect.assertions(3)
    expect(resultUseCase.isLeft()).toBeTruthy()

    if (resultUseCase.isLeft()) {
      expect(resultUseCase.value.errorCode).toBe(404)
      expect(resultUseCase.value.error).toBe(
        `User with id '${INPUT_DELETE_USER.id}' was not found.`,
      )
    }
  })
})
