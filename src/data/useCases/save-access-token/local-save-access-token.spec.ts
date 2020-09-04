import faker from 'faker'
import { SetStorageMock } from '@/data/test'
import { LocalSaveAccessTokenSpy } from './local-save-access-token'

describe('LocalSAveAccessToken', () => {
  it('should call setStorage with correct key and value', async() => {
    const setStorageMock = new SetStorageMock()
    const sut = new LocalSaveAccessTokenSpy(setStorageMock)
    const accessToken = faker.random.uuid()
    await sut.save(accessToken)
    expect(setStorageMock.key).toBe('accessToken')
    expect(setStorageMock.value).toBe(accessToken)
  })
})
