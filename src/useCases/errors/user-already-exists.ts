export class UserAlreadyExists extends Error {
  constructor() {
    super('Este e-mail já foi cadastrado! ')
  }
}
