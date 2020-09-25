import { RenderResult, fireEvent } from '@testing-library/react'
import faker from 'faker'

export const testChildCount = (
  sut: RenderResult,
  fieldName: string,
  count: number
): void => {
  expect(sut.getByTestId(fieldName).childElementCount).toBe(count)
}

export const testStatusForField = (
  sut: RenderResult,
  fieldName: string,
  validationError = ''
): void => {
  const wrap = sut.getByTestId(`${fieldName}-wrap`)
  const field = sut.getByTestId(fieldName)
  const label = sut.getByTestId(`${fieldName}-label`)
  expect(wrap.getAttribute('data-status')).toBe(
    validationError ? 'invalid' : 'valid'
  )
  expect(field.title).toBe(validationError)
  expect(label.title).toBe(validationError)
}

export const testButtonIsDisabled = (
  sut: RenderResult,
  elementTestId: string,
  isDisabled: boolean
): void => {
  expect((sut.getByTestId(elementTestId) as HTMLButtonElement).disabled).toBe(
    isDisabled
  )
}

export const fillField = (
  sut: RenderResult,
  field: string,
  fieldValue = faker.random.words()
): void => {
  const input = sut.getByTestId(field)
  fireEvent.input(input, { target: { value: fieldValue } })
}

export const testElementExists = (
  sut: RenderResult,
  elementTestId: string
): void => {
  expect(sut.getByTestId(elementTestId)).toBeTruthy()
}

export const testElementsTextContent = (
  sut: RenderResult,
  elementTestId: string,
  text: string
): void => {
  expect(sut.getByTestId(elementTestId).textContent).toBe(text)
}
