import { HttpPostClientParams } from '@/data/protocols/http'
import axios from 'axios'

export class AxiosHttpClient {
  async post (params: HttpPostClientParams<any>): Promise<void> {
    await axios.post(params.url, params.body)
  }
}
