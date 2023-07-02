import {
  InputUpdateUseCase,
  OutputUpdateUseCase,
} from '0-core/application/useCases/UpdateUseCase'

export type UpdateEntity<TEntity> = {
  updateEntity(input: InputUpdateUseCase<TEntity>): OutputUpdateUseCase<TEntity>
}
