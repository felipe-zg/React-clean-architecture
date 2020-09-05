import { SaveAccessToken } from '@/domain/use-cases'
import { LocalSaveAccessToken } from '@/data/useCases/save-access-token/local-save-access-token'
import { makeLocalStorageAdapter } from '../../cache/local-storage-adapter-factory'

export const makeLocalSaveAccessToken = (): SaveAccessToken => {
  return new LocalSaveAccessToken(makeLocalStorageAdapter())
}
