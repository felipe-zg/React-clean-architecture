import faker from 'faker'
import { AxiosHttpClient } from './axios.http-client'
import axios from 'axios'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

const makeSut = (): AxiosHttpClient => {
  return new AxiosHttpClient()
}
describe('AxiosHttpClient', () => {
  it('should call axios with correct url and body', async () => {
    const url = faker.internet.url()
    const sut = makeSut()
    await sut.post({ url })
    expect(mockedAxios).toHaveBeenCalledWith(url)
  })
})
