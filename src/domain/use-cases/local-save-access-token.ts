export interface LocalSaveAccessToken{
  save: (accessToken: string) => Promise<void>
}
