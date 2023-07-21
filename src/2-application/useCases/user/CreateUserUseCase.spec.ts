import 'reflect-metadata'

import { UsersRepository } from '2-application/repositories/UsersRepository'
import { UsersRepositoryInMemory } from '@test/repositories/in-memory/UsersRepositoryInMemory'
import { INPUT_CREATE_USER, makeUser } from '@test/utility/makeUser'

import { CreateUserUseCase } from './CreateUserUseCase'

describe('CreateUserUseCase', () => {
  it('should be able to create a new user', async () => {
    const usersRepository: UsersRepository = new UsersRepositoryInMemory()
    const createUserUseCase = new CreateUserUseCase(usersRepository)

    const resultUseCase = await createUserUseCase.execute(INPUT_CREATE_USER)

    expect.assertions(10)
    expect(resultUseCase.isRight()).toBeTruthy()

    if (resultUseCase.isRight()) {
      expect(resultUseCase.value.successCode).toBe(201)
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

  it('should throw an error when email is invalid', async () => {
    const usersRepository: UsersRepository = new UsersRepositoryInMemory()
    const createUserUseCase = new CreateUserUseCase(usersRepository)

    const resultUseCase = await createUserUseCase.execute({
      ...INPUT_CREATE_USER,
      email: 'invalid-email',
    })

    expect.assertions(2)
    expect(resultUseCase.isLeft()).toBeTruthy()

    if (resultUseCase.isLeft()) expect(resultUseCase.value.errorCode).toBe(422)
  })

  it('should throw an error when email is in use', async () => {
    expect.assertions(3)
    const user = await makeUser(INPUT_CREATE_USER)
    const usersRepository: UsersRepository = new UsersRepositoryInMemory([user])
    const createUserUseCase = new CreateUserUseCase(usersRepository)

    const resultUseCase = await createUserUseCase.execute(INPUT_CREATE_USER)

    expect(resultUseCase.isLeft()).toBeTruthy()

    if (resultUseCase.isLeft()) {
      expect(resultUseCase.value.errorCode).toBe(400)
      expect(resultUseCase.value.error).toBe(
        `The email: ${INPUT_CREATE_USER.email}  is already in use by another User.`,
      )
    }
  })
})
