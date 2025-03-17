import { describe, test, expect, beforeEach } from 'vitest'
import { AuthenticateUseCase } from './authenticate'
import { InMemoryUsersRepository } from './repositories/in-memory/in-memory-users-repository'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

let authenticateUseCaseTest: AuthenticateUseCase
let inMemoryUsersRepositoryTest: InMemoryUsersRepository

describe('Unit test to authenticate user', () => {
  beforeEach(() => {
    inMemoryUsersRepositoryTest = new InMemoryUsersRepository()
    authenticateUseCaseTest = new AuthenticateUseCase(
      inMemoryUsersRepositoryTest,
    )
  })

  test('it should be able to authenticate a user', async () => {
    const pass_hash = await hash('123456789', 6)
    await inMemoryUsersRepositoryTest.create({
      id: 'user-01',
      name: 'Henrique',
      email: 'henriquetomazparticular@gmail.com',
      password_hash: pass_hash,
      category: 'admin',
    })

    const { hasUser } = await authenticateUseCaseTest.execute({
      email: 'henriquetomazparticular@gmail.com',
      password: '123456789',
    })

    expect(hasUser).toEqual(
      expect.objectContaining({
        id: 'user-01',
        name: 'Henrique',
        category: 'admin',
      }),
    )
  })

  test('it should not be able to authenticate a not exists email users ', async () => {
    await expect(
      async () =>
        await authenticateUseCaseTest.execute({
          email: 'henriquetomazparticular@gmail.com',
          password: '123456789',
        }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  test('it should not be able to authenticate a is not in the same password ', async () => {
    const pass_hash = await hash('123456789', 6)
    await inMemoryUsersRepositoryTest.create({
      id: 'user-01',
      name: 'Henrique',
      email: 'henriquetomazparticular@gmail.com',
      password_hash: pass_hash,
      category: 'admin',
    })
    await expect(
      async () =>
        await authenticateUseCaseTest.execute({
          email: 'henriquetomazparticular@gmail.com',
          password: '12345678',
        }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
