import { RenderResult } from '@testing-library/react'

export const testChildCount = (sut: RenderResult, fieldName: string, count: number): void => {
  expect((sut.getByTestId(fieldName)).childElementCount).toBe(count)
}

export const testStatusForField = (sut: RenderResult, fieldName: string, validationError?: string): void => {
  const fieldStatus = sut.getByTestId(`${fieldName}-status`)
  expect(fieldStatus.title).toBe(validationError || 'Tudo certo!')
  expect(fieldStatus.textContent).toBe(validationError ? '🔴' : '🟢')
}

export const testButtonIsDisabled = (sut: RenderResult, elementTestId: string, isDisabled: boolean): void => {
  expect((sut.getByTestId(elementTestId) as HTMLButtonElement).disabled).toBe(isDisabled)
}
