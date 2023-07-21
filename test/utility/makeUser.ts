import { faker } from '@faker-js/faker'

import { NewUserDto, UserEntity } from '1-domain/entities/User/User'

export const INPUT_CREATE_USER = {
  name: 'gabriel',
  password: '123456',
  email: 'gabriel@gmail.com',
}

export async function makeUser(
  props?: Record<string, unknown>,
): Promise<UserEntity> {
  const result = await UserEntity.create({
    name: faker.internet.userName(),
    password: faker.internet.password(),
    email: faker.internet.email(),
    ...props,
  } as NewUserDto)

  if (result.isLeft()) throw new Error('Failed to create user')

  return result.value as UserEntity
}
