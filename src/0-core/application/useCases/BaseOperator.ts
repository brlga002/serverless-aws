export abstract class BaseOperator<TInput, TOutput> {
  abstract run(input: TInput): TOutput
}
