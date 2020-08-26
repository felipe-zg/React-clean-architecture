import { AxiosHttpClient } from '@/infra/http/axios-http-client/axios.http-client'
import { mockPostRequest } from '@/infra/http/axios-http-client/test'
import axios from 'axios'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

const makeSut = (): AxiosHttpClient => {
  return new AxiosHttpClient()
}
describe('AxiosHttpClient', () => {
  it('should call axios using the right method with correct url and body', async () => {
    const request = mockPostRequest()
    const sut = makeSut()
    await sut.post(request)
    expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body)
  })
})
