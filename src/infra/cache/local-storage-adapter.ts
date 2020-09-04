import { SetStorage } from '@/data/protocols/cache'

export class LocalStorageAdapter implements SetStorage {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  // eslint-disable-next-line @typescript-eslint/require-await
  async set(key: string, value: any): Promise<void> {
    localStorage.setItem(key, value)
  }
}
