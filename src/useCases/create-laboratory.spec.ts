import { describe, test, expect, beforeEach } from 'vitest'
import { CreateLaboratoryUseCase } from './create-laboratory'
import { InMemoryLaboratoriesRepository } from './repositories/in-memory/in-memory-laboratories-repository'
import { LaboratoryAlreadyExists } from './errors/laboratory-already-exists'

let createLaboratoryUseCaseTest: CreateLaboratoryUseCase
let inMemoryLaboratoryRepositoryTest: InMemoryLaboratoriesRepository

describe('Unit test to create laboratory', () => {
  beforeEach(() => {
    inMemoryLaboratoryRepositoryTest = new InMemoryLaboratoriesRepository()
    createLaboratoryUseCaseTest = new CreateLaboratoryUseCase(
      inMemoryLaboratoryRepositoryTest,
    )
  })
  test('it should be able to create a laboratory', async () => {
    const { newLaboratory } = await createLaboratoryUseCaseTest.execute({
      userId: 'user-01',
      name: 'Computer Lab',
      localization: 'Andar B',
      description: 'Aula de algoritmos',
      capacity: 30,
    })

    await expect(newLaboratory).toEqual(
      expect.objectContaining({
        name: 'Computer Lab',
        capacity: 30,
      }),
    )
  })

  test('it should not be able to create a laboratory already exists', async () => {
    await createLaboratoryUseCaseTest.execute({
      userId: 'user-01',
      name: 'Computer Lab',
      localization: 'Andar B',
      description: 'Aula de algoritmos',
      capacity: 30,
    })

    await expect(
      async () =>
        await createLaboratoryUseCaseTest.execute({
          userId: 'user-01',
          name: 'Computer Lab',
          localization: 'Andar B',
          description: 'Aula de algoritmos',
          capacity: 30,
        }),
    ).rejects.toBeInstanceOf(LaboratoryAlreadyExists)
  })
})
