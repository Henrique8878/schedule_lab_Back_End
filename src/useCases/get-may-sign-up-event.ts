import { SignUpEventRepository } from './repositories/sign-up-event-repository'

export class GetManySignUpEventUseCase {
  constructor(private signUpEventRepository: SignUpEventRepository) {}

  async execute() {
    const manySignUpEvent = await this.signUpEventRepository.getManySignUp()
    return manySignUpEvent
  }
}
