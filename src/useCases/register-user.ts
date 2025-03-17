import { hash } from 'bcryptjs'
import { UsersRepository } from './repositories/users-repository'
import { UserAlreadyExists } from './errors/user-already-exists'
import { User } from '@prisma/client'

interface registerParams {
  name: string
  email: string
  password_hash: string
  category: string
}

interface registerReturn {
  newUser: User
}
export class RegisterUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    name,
    email,
    password_hash,
    category,
  }: registerParams): Promise<registerReturn> {
    const user = await this.usersRepository.findByEmail(email)

    if (user) {
      throw new UserAlreadyExists()
    }

    const Hash = await hash(password_hash, 6)
    const newUser = await this.usersRepository.create({
      name,
      email,
      password_hash: Hash,
      category,
    })

    return {
      newUser,
    }
  }
}
