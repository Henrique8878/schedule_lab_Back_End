import { describe, test, expect, beforeEach } from 'vitest'
import { GetLaboretoriesUseCase } from './get-laboratories'
import { InMemoryLaboratoriesRepository } from './repositories/in-memory/in-memory-laboratories-repository'

let getLaboratoriesUseCaseTest: GetLaboretoriesUseCase
let inMemoryLaboratoriesRepositoryTest: InMemoryLaboratoriesRepository

describe('Unit tests to get many laboratories', () => {
  beforeEach(() => {
    inMemoryLaboratoriesRepositoryTest = new InMemoryLaboratoriesRepository()
    getLaboratoriesUseCaseTest = new GetLaboretoriesUseCase(
      inMemoryLaboratoriesRepositoryTest,
    )
  })

  test('it should be possible get many laboratories', async () => {
    await inMemoryLaboratoriesRepositoryTest.create({
      userId: 'user-01',
      name: 'lab-01',
      localization: 'loc-01',
      capacity: 32,
      description: 'desc-01',
    })
    await inMemoryLaboratoriesRepositoryTest.create({
      userId: 'user-02',
      name: 'lab-02',
      localization: 'loc-02',
      capacity: 32,
      description: 'desc-02',
    })

    const laboratories = await getLaboratoriesUseCaseTest.execute()
    expect(laboratories).toEqual([
      expect.objectContaining({
        name: 'lab-01',
      }),
      expect.objectContaining({
        name: 'lab-02',
      }),
    ])
  })

  test('it should be possible get a empty list of laboratories', async () => {
    const laboratories = await getLaboratoriesUseCaseTest.execute()
    expect(laboratories).toEqual([])
  })
})
