export class LaboratoryAlreadyExists extends Error {
  constructor() {
    super('Nome de laboratório já existente')
  }
}
