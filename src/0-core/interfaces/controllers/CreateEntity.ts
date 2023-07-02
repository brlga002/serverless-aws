import {
  InputCreateUseCase,
  OutputCreateUseCase,
} from '0-core/application/useCases/CreateUseCase'

export type CreateEntity<TEntity> = {
  createEntity(input: InputCreateUseCase<TEntity>): OutputCreateUseCase<TEntity>
}
