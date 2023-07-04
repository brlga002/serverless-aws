import { z } from 'zod'

import { entityProps } from '0-core/domain/entities/Entity'
import { Role } from '0-core/domain/entities/Role'

const userProps = {
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string(),
  tenantId: z.nullable(entityProps.id),
  role: z.enum([Role.ADMIN, Role.CLIENT]),
}

export const newUserSchema = z.object({
  name: userProps.name,
  email: userProps.email,
  password: userProps.password,
  tenantId: userProps.tenantId,
  role: userProps.role,
})

export const updateUserSchema = z.object({
  id: entityProps.id,
  name: userProps.name,
})

const { id, ...rest } = entityProps
export const UserSchema = z.object({ id, ...userProps, ...rest })
