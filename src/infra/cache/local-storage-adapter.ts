import { SetStorage } from '@/data/protocols/cache'

export class LocalStorageAdapter implements SetStorage {
  // eslint-disable-next-line @typescript-eslint/ban-types
  set(key: string, value: object): void {
    localStorage.setItem(key, JSON.stringify(value))
  }
}
