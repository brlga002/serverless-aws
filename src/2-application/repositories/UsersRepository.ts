import { Repository } from '0-core/application/repositories/Repository'
import { UserDto, UserEntity } from '1-domain/entities/User/User'

export interface UsersRepository extends Repository<UserEntity, UserDto> {
  existedEmail(email: string): Promise<boolean>
  findByEmail(email: string): Promise<UserEntity | null>
}
