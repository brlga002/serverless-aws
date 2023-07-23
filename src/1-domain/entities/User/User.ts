import { compare, hash } from 'bcryptjs'
import { z } from 'zod'

import { Entity, EntityDto } from '0-core/domain/entities/Entity'
import { Either, left, right } from '0-core/domain/result/Either'
import { makeId } from '0-core/shared/makeId'

import { newUserSchema, updateUserSchema, UserSchema } from './User.schema'

export type NewUserDto = z.infer<typeof newUserSchema>

export type UserDto = z.infer<typeof UserSchema> & { password: string }

export type UpdateUserDto = z.infer<typeof updateUserSchema>

export class UserEntity extends Entity<UserDto> {
  protected constructor(props: NewUserDto | UserDto) {
    super(props as UserDto)
  }

  static async create(props: NewUserDto): Promise<Either<Error, UserEntity>> {
    const id = makeId()
    const user = new UserEntity({
      id,
      createdBy: id,
      ...props,
    })

    await user.setHashPassword(props.password)

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
    oldPassword: string,
    newPassword: string,
  ): Promise<Either<Error, boolean>> {
    const validation = await this.validatePassword(oldPassword)
    if (validation.isRight()) await this.setHashPassword(newPassword)
    return validation
  }

  async validatePassword(password: string): Promise<Either<Error, boolean>> {
    try {
      const isMatch = await compare(password, this.props.password)
      if (!isMatch) return left(new Error('The password is incorrect.'))
      return right(true)
    } catch (err) {
      return left(err as Error)
    }
  }

  async setHashPassword(value: string) {
    const saltRounds = 10
    const test = await hash(value, saltRounds)
    this.props.password = test
  }

  exportFields(hideSensitiveFields: boolean): Omit<UserDto, keyof EntityDto> {
    return {
      name: this.props.name,
      email: this.props.email,
      tenantId: this.props.tenantId,
      role: this.props.role,
      ...(!hideSensitiveFields && { password: this.props.password }),
    } as Omit<UserDto, keyof EntityDto>
  }
}
