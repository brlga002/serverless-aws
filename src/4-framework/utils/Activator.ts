export class Activator {
  static createInstance(newable: new (...args: any) => any, ...args: any[]) {
    const proto = Object.create(newable.prototype)
    return new proto.constructor(...args)
  }

  static instantiateAs<T>(newable: new (...args: any) => T, ...args: any[]): T {
    return this.createInstance(newable, ...args) as T
  }
}
