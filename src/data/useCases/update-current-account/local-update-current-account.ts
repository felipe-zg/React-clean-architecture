import { UpdateCurrentAccount } from '@/domain/use-cases'
import { SetStorage } from '@/data/protocols/cache'
import { UnexpectedError } from '@/domain/errors'
import { AccountModel } from '@/domain/models'

export class LocalUpdateCurrentAccount implements UpdateCurrentAccount {
  constructor(private readonly setStorage: SetStorage) {}

  // eslint-disable-next-line @typescript-eslint/require-await
  async save(account: AccountModel): Promise<void> {
    if (!account?.accessToken) throw new UnexpectedError()
    this.setStorage.set('account', JSON.stringify(account))
  }
}
