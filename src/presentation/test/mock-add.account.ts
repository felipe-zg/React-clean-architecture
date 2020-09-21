import { AddAccount, AddAccountParams } from '@/domain/use-cases'
import { mockAccountModel } from '@/domain/test'
import { AccountModel } from '@/domain/models'

export class AddAccountSpy implements AddAccount {
  account = mockAccountModel()
  params: AddAccountParams

  async add(params: AddAccountParams): Promise<AccountModel> {
    this.params = params
    return Promise.resolve(this.account)
  }
}
