import { compare, hash } from 'bcryptjs'
import { z } from 'zod'

import { Entity, EntityDto } from '0-core/domain/entities/Entity'
import { Either, left, right } from '0-core/domain/result/Either'

import { newUserSchema, updateUserSchema, UserSchema } from './User.schema'

export type NewUserDto = z.infer<typeof newUserSchema>

export type UserDto = z.infer<typeof UserSchema>

export type UpdateUserDto = z.infer<typeof updateUserSchema>

export class UserEntity extends Entity<UserDto> {
  protected constructor(props: NewUserDto | UserDto) {
    super(props as UserDto)
  }

  static create(props: NewUserDto): Either<Error, UserEntity> {
    const user = new UserEntity({
      ...props,
      createdBy: 'to do',
    })

    user.setHashPassword(props.password)

    const result = user.selfValidateEntity<UserEntity>(UserSchema)
    if (result.isLeft()) return left(new Error(result.value.message))
    return right(user)
  }

  static update(
    entity: UserDto,
    newData: Partial<UserDto>,
  ): Either<Error, UserEntity> {
    const user = new UserEntity({
      ...entity,
      ...newData,
      updatedAt: new Date().toISOString(),
    })

    const result = user.selfValidateEntity<UserEntity>(UserSchema)
    if (result.isLeft()) return left(new Error(result.value.message))
    return right(user)
  }

  async changePassword(
    old: string,
    newPassword: string,
  ): Promise<Either<Error, boolean>> {
    const validation = await this.validatePassword(old)
    if (validation.isRight()) await this.setHashPassword(newPassword)
    return validation
  }

  async validatePassword(password: string): Promise<Either<Error, boolean>> {
    try {
      const isMatch = await compare(password, this.props.password)
      if (!isMatch) return left(new Error('Invalid password'))
      return right(true)
    } catch (err) {
      return left(err as Error)
    }
  }

  async setHashPassword(value: string) {
    const saltRounds = 10
    this.props.password = await hash(value, saltRounds)
  }

  exportFields(): Omit<UserDto, keyof EntityDto> {
    return {
      name: this.props.name,
      email: this.props.email,
      password: this.props.password,
      tenantId: this.props.tenantId,
      role: this.props.role,
    }
  }
}
