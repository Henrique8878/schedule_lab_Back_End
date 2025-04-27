import { SignUpEventRepository } from './repositories/sign-up-event-repository'

interface UpdateSignUpEventUseCaseParams {
  id: string
  name: string | undefined
  email: string | undefined
  telephone: string | undefined
}

export class UpdateSignUpEventUseCase {
  constructor(private signUpEventRepository: SignUpEventRepository) {}

  async execute({
    id,
    name,
    email,
    telephone,
  }: UpdateSignUpEventUseCaseParams) {
    const data = {
      name,
      email,
      telephone,
    }
    const updateSignUpEvent = await this.signUpEventRepository.updateSignUp(
      id,
      data,
    )
    return updateSignUpEvent
  }
}
