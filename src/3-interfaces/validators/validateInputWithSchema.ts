import { z } from 'zod'

import { ApplicationError } from '0-core/application/result/ApplicationError'
import { Either, left, right } from '0-core/domain/result/Either'

export function validateInputWithSchema<T>(
  schema: z.ZodType,
  props: unknown,
): Either<ApplicationError, T> {
  const result = schema.safeParse(props)
  if (!result.success) {
    const message = result.error.issues
    return left(ApplicationError.badRequest(message as unknown as string))
  }

  return right(result.data)
}
