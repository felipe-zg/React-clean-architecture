import { AccountModel } from '@/domain/models'
import { UpdateCurrentAccount } from '@/domain/use-cases'

export class UpdateCurrentAccountMock implements UpdateCurrentAccount {
  account: AccountModel

  // eslint-disable-next-line @typescript-eslint/require-await
  async save(account: AccountModel): Promise<void> {
    this.account = account
  }
}
