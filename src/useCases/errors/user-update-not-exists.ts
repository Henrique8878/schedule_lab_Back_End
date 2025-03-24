export class UserUpdateNotExists extends Error {
  constructor() {
    super('cannot update a non-existing user')
  }
}
