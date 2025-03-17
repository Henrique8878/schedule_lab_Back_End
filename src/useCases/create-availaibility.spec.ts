import { describe, test, expect, beforeEach } from 'vitest'
import { CreateAvailaibilityUseCase } from './create-availaibility'
import { InMemoryAvailaibilityRepository } from './repositories/in-memory/in-memory-availaibility-repository'
import { AvailabilityAlreadyExists } from './errors/availaibility-already-exists'

let createAvailaibilityUseCaseTest: CreateAvailaibilityUseCase
let inMemoryAvailaibilityRepositoryTest: InMemoryAvailaibilityRepository

describe('Unit test to create availaibility', () => {
  beforeEach(() => {
    inMemoryAvailaibilityRepositoryTest = new InMemoryAvailaibilityRepository()
    createAvailaibilityUseCaseTest = new CreateAvailaibilityUseCase(
      inMemoryAvailaibilityRepositoryTest,
    )
  })

  test('it should be able to create availaibility', async () => {
    const { newAvailaibility } = await createAvailaibilityUseCaseTest.execute({
      id: 'availaibility-01',
      created_at: new Date(Date.now()),
      date: new Date('2025-03-13'),
      beginHour: new Date('2025-03-13T08:00Z'),
      endHour: new Date('2025-03-13T09:00Z'),
      laboratoryId: 'laboratory-01',
    })

    expect(newAvailaibility).toEqual(
      expect.objectContaining({
        laboratoryId: 'laboratory-01',
        id: 'availaibility-01',
      }),
    )
  })

  test('it should not be able to create already exists availaibility in the same laboratory', async () => {
    await createAvailaibilityUseCaseTest.execute({
      id: 'availaibility-01',
      created_at: new Date(Date.now()),
      date: new Date('2025-03-13'),
      beginHour: new Date('2025-03-13T08:00Z'),
      endHour: new Date('2025-03-13T09:00Z'),
      laboratoryId: 'laboratory-01',
    })

    await expect(
      async () =>
        await createAvailaibilityUseCaseTest.execute({
          id: 'availaibility-02',
          created_at: new Date(Date.now()),
          date: new Date('2025-03-13'),
          beginHour: new Date('2025-03-13T08:00Z'),
          endHour: new Date('2025-03-13T09:00Z'),
          laboratoryId: 'laboratory-01',
        }),
    ).rejects.toBeInstanceOf(AvailabilityAlreadyExists)
  })
})
