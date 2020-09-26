import faker from 'faker'
import { RemoteLoadSurveyList } from '@/data/useCases/load-survey-list/remote-load-survey-list'
import { HttpGetClientSpy } from '@/data/test'

describe('RemoteLoadSurveyList', () => {
  it('should call HttpGetClient with correct URL', async () => {
    const url = faker.internet.url()
    const httpGetClientSpy = new HttpGetClientSpy()
    const sut = new RemoteLoadSurveyList(url, httpGetClientSpy)
    await sut.loadAll()
    expect(httpGetClientSpy.url).toBe(url)
  })
})
