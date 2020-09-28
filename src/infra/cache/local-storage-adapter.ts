import { GetStorage, SetStorage } from '@/data/protocols/cache'
import { AccountModel } from '@/domain/models'

export class LocalStorageAdapter implements SetStorage, GetStorage {
  // eslint-disable-next-line @typescript-eslint/ban-types
  set(key: string, value: object): void {
    localStorage.setItem(key, JSON.stringify(value))
  }

  get(key: string): AccountModel {
    return JSON.parse(localStorage.getItem(key))
  }
}
