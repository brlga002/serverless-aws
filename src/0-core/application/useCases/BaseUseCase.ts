export abstract class BaseUseCase<Input, Output> {
  abstract execute(input: Input): Output
}
