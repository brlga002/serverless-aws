import 'reflect-metadata'

import { UsersRepository } from '2-application/repositories/UsersRepository'
import { JwtTokenService } from '4-framework/services/JwtTokenService'
import { UsersRepositoryInMemory } from '@test/repositories/in-memory/UsersRepositoryInMemory'
import { INPUT_CREATE_USER, makeUser } from '@test/utility/makeUser'

import { AuthUserUseCase } from './AuthUserUseCase'

const INPUT_AUTH_USER = {
  password: '123456',
  email: 'gabriel@gmail.com',
}

describe('AuthUserUseCase', () => {
  it('should be able to auth an user', async () => {
    const user = await makeUser(INPUT_CREATE_USER)
    const usersRepository: UsersRepository = new UsersRepositoryInMemory([user])
    const tokenService = new JwtTokenService()
    const authUserUseCase = new AuthUserUseCase(usersRepository, tokenService)

    const resultUseCase = await authUserUseCase.execute(INPUT_AUTH_USER)

    expect.assertions(5)
    expect(resultUseCase.isRight()).toBeTruthy()

    if (resultUseCase.isRight()) {
      expect(resultUseCase.value.successCode).toBe(200)
      expect(resultUseCase.value.content).toBeTruthy()
      const tokenResult = resultUseCase.value.content!
      expect(tokenResult).toHaveProperty('token')
      expect(tokenResult).toHaveProperty('name')
    }
  })

  it('should throw an error when email is invalid', async () => {
    const user = await makeUser(INPUT_CREATE_USER)
    const usersRepository: UsersRepository = new UsersRepositoryInMemory([user])
    const tokenService = new JwtTokenService()
    const authUserUseCase = new AuthUserUseCase(usersRepository, tokenService)

    const resultUseCase = await authUserUseCase.execute({
      ...INPUT_AUTH_USER,
      email: 'invalid-email',
    })

    expect.assertions(3)
    expect(resultUseCase.isLeft()).toBeTruthy()

    if (resultUseCase.isLeft()) {
      expect(resultUseCase.value.errorCode).toBe(404)
      expect(resultUseCase.value.error).toBe(
        'The email: invalid-email not found.',
      )
    }
  })

  it('should throw an error when password is invalid', async () => {
    const user = await makeUser(INPUT_CREATE_USER)
    const usersRepository: UsersRepository = new UsersRepositoryInMemory([user])
    const tokenService = new JwtTokenService()
    const authUserUseCase = new AuthUserUseCase(usersRepository, tokenService)

    const resultUseCase = await authUserUseCase.execute({
      ...INPUT_AUTH_USER,
      password: 'invalid-password',
    })

    expect.assertions(3)
    expect(resultUseCase.isLeft()).toBeTruthy()

    if (resultUseCase.isLeft()) {
      expect(resultUseCase.value.errorCode).toBe(404)
      expect(resultUseCase.value.error).toBe('The password is incorrect.')
    }
  })
})
