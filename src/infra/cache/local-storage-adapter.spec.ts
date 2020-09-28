import faker from 'faker'
import 'jest-localstorage-mock'
import { LocalStorageAdapter } from '@/infra/cache/local-storage-adapter'
import { AccountModel } from '@/domain/models'

describe('LocalStorageAdapter', () => {
  beforeEach(() => {
    localStorage.clear()
  })
  it('should call LocalStorage.setItem with correct values', () => {
    const sut = new LocalStorageAdapter()
    const key = faker.database.column()
    const value = faker.random.objectElement<AccountModel>()
    sut.set(key, value)
    expect(localStorage.setItem).toHaveBeenCalledWith(
      key,
      JSON.stringify(value)
    )
  })

  it('should call LocalStorage.getItem with correct value', () => {
    const sut = new LocalStorageAdapter()
    const key = faker.database.column()
    const value = faker.random.objectElement<AccountModel>()
    const getItemSpy = jest
      .spyOn(localStorage, 'getItem')
      .mockReturnValue(JSON.stringify(value))

    const obj = sut.get(key)
    expect(obj).toEqual(value)
    expect(getItemSpy).toHaveBeenCalledWith(key)
  })
})
