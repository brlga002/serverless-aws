import 'reflect-metadata'

import { InputUpdateUserPassword } from '1-domain/controllers/AuthUserRoutesController'
import { UsersRepository } from '2-application/repositories/UsersRepository'
import { UsersRepositoryInMemory } from '@test/repositories/in-memory/UsersRepositoryInMemory'
import { CURRENT_USER } from '@test/utility/currentUser'
import { INPUT_CREATE_USER, makeUser } from '@test/utility/makeUser'

import { UpdateUserPasswordUseCase } from './UpdateUserPasswordUseCase'

const INPUT_UPDATE_USER: InputUpdateUserPassword = {
  oldPassword: '123456',
  newPassword: '654321',
}

describe('UpdateUserPasswordUseCase', () => {
  it('should be able to alter user password', async () => {
    const user = await makeUser({
      ...INPUT_CREATE_USER,
      id: 'valid-user-id',
    })
    const usersRepository: UsersRepository = new UsersRepositoryInMemory([user])
    const updateUserPasswordUseCase = new UpdateUserPasswordUseCase(
      usersRepository,
      CURRENT_USER,
    )

    const resultUseCase = await updateUserPasswordUseCase.execute(
      INPUT_UPDATE_USER,
    )

    expect.assertions(3)
    expect(resultUseCase.isRight()).toBeTruthy()

    if (resultUseCase.isRight()) {
      expect(resultUseCase.value.successCode).toBe(200)
      expect(resultUseCase.value.content).toBe(true)
    }
  })

  it('should throw an error when user not found', async () => {
    const usersRepository: UsersRepository = new UsersRepositoryInMemory()
    const updateUserPasswordUseCase = new UpdateUserPasswordUseCase(
      usersRepository,
      CURRENT_USER,
    )

    const resultUseCase = await updateUserPasswordUseCase.execute(
      INPUT_UPDATE_USER,
    )

    expect.assertions(3)
    expect(resultUseCase.isLeft()).toBeTruthy()

    if (resultUseCase.isLeft()) {
      expect(resultUseCase.value.errorCode).toBe(404)
      expect(resultUseCase.value.error).toBe(
        `User with id '${CURRENT_USER.userId}' was not found.`,
      )
    }
  })

  it('should throw an error when old password is invalid', async () => {
    const user = await makeUser({
      ...INPUT_CREATE_USER,
      id: 'valid-user-id',
    })
    const usersRepository: UsersRepository = new UsersRepositoryInMemory([user])
    const updateUserPasswordUseCase = new UpdateUserPasswordUseCase(
      usersRepository,
      CURRENT_USER,
    )

    const resultUseCase = await updateUserPasswordUseCase.execute({
      ...INPUT_UPDATE_USER,
      oldPassword: 'invalid-old-password',
    })

    expect.assertions(3)
    expect(resultUseCase.isLeft()).toBeTruthy()

    if (resultUseCase.isLeft()) {
      expect(resultUseCase.value.errorCode).toBe(400)
      expect(resultUseCase.value.error).toBe('The password is incorrect.')
    }
  })
})
