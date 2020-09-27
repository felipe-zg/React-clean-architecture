import { UpdateCurrentAccount } from '@/domain/use-cases'
import { LocalUpdateCurrentAccount } from '@/data/useCases/update-current-account/local-update-current-account'
import { makeLocalStorageAdapter } from '../../cache/local-storage-adapter-factory'

export const makeUpdateCurrentAccount = (): UpdateCurrentAccount => {
  return new LocalUpdateCurrentAccount(makeLocalStorageAdapter())
}
