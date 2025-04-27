import { SignUpEventRepository } from './repositories/sign-up-event-repository'

interface CreateSignUpEventUseCaseParams {
  name: string
  email: string
  telephone: string
  availabilityId: string
}

export class CreateSignUpEventUseCase {
  constructor(private signUpEventRepository: SignUpEventRepository) {}

  async execute({
    name,
    email,
    telephone,
    availabilityId,
  }: CreateSignUpEventUseCaseParams) {
    const newSignUpEvent = {
      name,
      email,
      telephone,
      availabilityId,
    }
    const signUpEvent = await this.signUpEventRepository.create(newSignUpEvent)
    return signUpEvent
  }
}
