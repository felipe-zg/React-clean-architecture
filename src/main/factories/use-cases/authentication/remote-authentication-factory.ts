import { RemoteAuthentication } from '@/data/useCases/authentication/remote-authentication'
import { makeAxiosHttpClient, makeApiUrl } from '@/main/factories/http'
import { Authentication } from '@/domain/useCases'

export const makeRemoteAuthentication = (): Authentication => {
  return new RemoteAuthentication(makeApiUrl(), makeAxiosHttpClient())
}
