import { UserDto, UserEntity } from '1-domain/entities/User/User'
import { UsersRepository } from '2-application/repositories/UsersRepository'
import { UserMongooseModel } from '4-framework/repositories/user/UserMongooseModel'

import { MongooseRepository } from '../MongooseRepository'

export class UserMongooseRepository
  extends MongooseRepository<UserEntity, UserDto>
  implements UsersRepository
{
  constructor() {
    super(UserEntity, UserMongooseModel)
  }

  async existedEmail(email: string): Promise<boolean> {
    return await this.exists({ email })
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    await this.connect()
    const result = await this._model.findOne({ email })
    if (!result) return null
    return this.createClassInstance(result)
  }
}
