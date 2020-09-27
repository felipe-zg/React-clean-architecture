import faker from 'faker'
import 'jest-localstorage-mock'
import { LocalStorageAdapter } from '@/infra/cache/local-storage-adapter'

describe('LocalStorageAdapter', () => {
  beforeEach(() => {
    localStorage.clear()
  })
  it('should call LocalStorage with correct value', () => {
    const sut = new LocalStorageAdapter()
    const key = faker.database.column()
    const value = faker.random.word()
    sut.set(key, value)
    expect(localStorage.setItem).toHaveBeenCalledWith(key, value)
  })
})
