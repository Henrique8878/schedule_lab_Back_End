import { SignUpEventRepository } from './repositories/sign-up-event-repository'

interface DeleteSignUpEventUseCaseParams {
  id: string
}

export class DeleteSignUpEventUseCase {
  constructor(private signUpEventRepository: SignUpEventRepository) {}

  async execute({ id }: DeleteSignUpEventUseCaseParams) {
    const deleteSignUpEvent = await this.signUpEventRepository.deleteSignUp(id)
    return deleteSignUpEvent
  }
}
