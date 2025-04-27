import { Prisma, SignUpEvent } from '@prisma/client'

export interface SignUpEventRepository {
  create(data: Prisma.SignUpEventUncheckedCreateInput): Promise<SignUpEvent>
  getSignUpById(id: string): Promise<SignUpEvent | null>
  getManySignUp(): Promise<SignUpEvent[] | []>
  updateSignUp(
    id: string,
    data: Prisma.SignUpEventUncheckedUpdateInput,
  ): Promise<SignUpEvent>
  deleteSignUp(id: string): Promise<SignUpEvent>
}
