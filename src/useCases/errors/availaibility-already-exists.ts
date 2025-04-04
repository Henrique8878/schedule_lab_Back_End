export class AvailabilityAlreadyExists extends Error {
  constructor() {
    super('Horário de reserva não disponível')
  }
}
