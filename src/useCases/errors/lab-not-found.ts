export class LabNotFoundError extends Error {
  constructor() {
    super('Laboratory not found')
    this.name = 'LabNotFoundError'
  }
}
