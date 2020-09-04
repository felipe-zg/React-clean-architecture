import { LocalSaveAccessToken } from '@/domain/use-cases'
import { SetStorage } from '@/data/protocols/cache'

export class LocalSaveAccessTokenSpy implements LocalSaveAccessToken {
  constructor(private readonly setStorage: SetStorage) {}

  async save (accessToken: string): Promise<void> {
    await this.setStorage.set('accessToken', accessToken)
  }
}
