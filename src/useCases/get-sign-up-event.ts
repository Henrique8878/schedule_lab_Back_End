import { SignUpEventRepository } from './repositories/sign-up-event-repository'

interface GetSignUpEventUseCaseParams {
  id: string
}

export class GetSignUpEventUseCase {
  constructor(private signUpEventRepository: SignUpEventRepository) {}

  async execute({ id }: GetSignUpEventUseCaseParams) {
    const signUpEvent = await this.signUpEventRepository.getSignUpById(id)
    return signUpEvent
  }
}
