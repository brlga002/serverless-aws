import { faker } from '@faker-js/faker'

import { Role } from '0-core/domain/entities/Role'
import { NewUserDto, UserEntity } from '1-domain/entities/User/User'

export const INPUT_CREATE_USER = {
  name: 'gabriel',
  password: '123456',
  email: 'gabriel@gmail.com',
  tenantId: '564646565',
  role: Role.ADMIN,
}

export async function makeUser(
  props?: Record<string, unknown>,
): Promise<UserEntity> {
  const result = await UserEntity.create({
    name: faker.internet.userName(),
    password: faker.internet.password(),
    email: faker.internet.email(),
    tenantId: INPUT_CREATE_USER.tenantId,
    role: INPUT_CREATE_USER.role,
    ...props,
  } as NewUserDto)

  if (result.isLeft()) throw new Error('Failed to create user')

  return result.value as UserEntity
}
