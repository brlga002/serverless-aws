import { z } from 'zod'

import { Either, left, right } from '0-core/domain/result/Either'

export class ValidateInput<T> {
  constructor(private schema: z.ZodType) {}

  validate(props: unknown): Either<Error, T> {
    const result = this.schema.safeParse(props)
    if (!result.success) {
      const message = result.error.issues[0] ?? 'Zod Error'
      return left({ message } as unknown as Error)
    }

    return right(result.data)
  }
}
