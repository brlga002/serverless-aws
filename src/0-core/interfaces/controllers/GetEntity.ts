import {
  InputGetUseCase,
  OutputGetUseCase,
} from '0-core/application/useCases/GetUseCase'

export type GetEntity<TEntity> = {
  getEntity(input: InputGetUseCase): OutputGetUseCase<TEntity>
}
