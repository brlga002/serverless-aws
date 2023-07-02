import {
  InputDeleteUseCase,
  OutputDeleteUseCase,
} from '0-core/application/useCases/DeleteUseCase'

export type DeleteEntity = {
  deleteEntity(input: InputDeleteUseCase): OutputDeleteUseCase
}
