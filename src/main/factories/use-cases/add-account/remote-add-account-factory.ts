import { makeAxiosHttpClient, makeApiUrl } from '@/main/factories/http'
import { AddAccount } from '@/domain/use-cases'
import { RemoteAddAccount } from '@/data/useCases/add-account/remote-add-account'

export const makeRemoteAddAccount = (): AddAccount => {
  return new RemoteAddAccount(makeApiUrl('/signup'), makeAxiosHttpClient())
}
