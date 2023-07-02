export abstract class Exception {
  constructor(
    private code: number = 500,
    private message: string = 'Server error',
  ) {}
}
