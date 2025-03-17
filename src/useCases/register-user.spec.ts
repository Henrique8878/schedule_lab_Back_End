import { describe, test, expect, beforeEach } from 'vitest'
import { RegisterUseCase } from './register-user'
import { InMemoryUsersRepository } from './repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExists } from './errors/user-already-exists'

let inMemoryUsersRepositoryTest: InMemoryUsersRepository
let registerUseCaseTest: RegisterUseCase
describe('Unit test to register users', () => {
  beforeEach(() => {
    inMemoryUsersRepositoryTest = new InMemoryUsersRepository()
    registerUseCaseTest = new RegisterUseCase(inMemoryUsersRepositoryTest)
  })
  test('it should be able register a users', async () => {
    const { newUser } = await registerUseCaseTest.execute({
      name: 'Henrique',
      email: 'henriquetomazparticular@gmail.com',
      category: 'admin',
      password_hash: '123456789',
    })

    expect(newUser).toEqual(
      expect.objectContaining({
        name: 'Henrique',
        category: 'admin',
      }),
    )
  })

  test('it should not be able register a already exists users', async () => {
    await registerUseCaseTest.execute({
      name: 'Henrique',
      email: 'henriquetomazparticular@gmail.com',
      category: 'admin',
      password_hash: '123456789',
    })

    await expect(() =>
      registerUseCaseTest.execute({
        name: 'Henrique',
        email: 'henriquetomazparticular@gmail.com',
        category: 'admin',
        password_hash: '123456789',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExists)
  })
})
