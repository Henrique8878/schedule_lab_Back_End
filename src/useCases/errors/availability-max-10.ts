export class AvailabilityMax10 extends Error {
  constructor() {
    super(
      'Só é possível um usuário cadastrar 10 reservas, exclua alguma para cadastrar novamente.',
    )
  }
}
