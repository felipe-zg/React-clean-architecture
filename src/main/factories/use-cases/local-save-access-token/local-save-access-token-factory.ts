import { LocalSaveAccessToken } from '@/domain/use-cases'
import { LocalSaveAccessTokenSpy } from '@/data/useCases/save-access-token/local-save-access-token'
import { makeLocalStorageAdapter } from '../../cache/local-storage-adapter-factory'

export const makeLocalSaveAccessToken = (): LocalSaveAccessToken => {
  return new LocalSaveAccessTokenSpy(makeLocalStorageAdapter())
}
