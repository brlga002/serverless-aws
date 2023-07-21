import { ObjectId } from 'bson'

export function makeId(): string {
  return new ObjectId().toString()
}
