import faker from 'faker'
import { SetStorageMock } from '@/data/test'
import { LocalSaveAccessTokenSpy } from './local-save-access-token'

type SutTypes = {
  sut: LocalSaveAccessTokenSpy
  setStorageMock: SetStorageMock
}
const makeSut = (): SutTypes => {
  const setStorageMock = new SetStorageMock()
  const sut = new LocalSaveAccessTokenSpy(setStorageMock)
  return {
    sut,
    setStorageMock
  }
}

describe('LocalSAveAccessToken', () => {
  it('should call setStorage with correct key and value', async() => {
    const { sut, setStorageMock } = makeSut()
    const accessToken = faker.random.uuid()
    await sut.save(accessToken)
    expect(setStorageMock.key).toBe('accessToken')
    expect(setStorageMock.value).toBe(accessToken)
  })
})
