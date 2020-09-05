import { SaveAccessToken } from '@/domain/use-cases'

export class SaveAccessTokenMock implements SaveAccessToken {
  accessToken: string

  // eslint-disable-next-line @typescript-eslint/require-await
  async save(accessToken: string): Promise<void> {
    this.accessToken = accessToken
  }
}
