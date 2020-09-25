import { SurveyModel } from '@/domain/models'

export interface LoadSurveys {
  loadAll: () => Promise<SurveyModel[]>
}
