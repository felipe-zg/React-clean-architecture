import { HttpStatusCode } from '@/data/protocols/http'
import { HttpGetClient } from '@/data/protocols/http/http-get-client'
import { UnexpectedError } from '@/domain/errors'
import { SurveyModel } from '@/domain/models'
import { LoadSurveyList } from '@/domain/use-cases'

export class RemoteLoadSurveyList implements LoadSurveyList {
  constructor(
    private readonly url: string,
    private readonly httpGetClient: HttpGetClient<SurveyModel[]>
  ) {}

  async loadAll(): Promise<SurveyModel[]> {
    const httpResponse = await this.httpGetClient.get({ url: this.url })
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return httpResponse.body
      default:
        throw new UnexpectedError()
    }
  }
}
