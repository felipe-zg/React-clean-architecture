import React from 'react'
import faker from 'faker'
import { render, RenderResult, fireEvent } from '@testing-library/react'
import { Input } from '@/presentation/components'
import Context from '@/presentation/context/form/form-context'

const makeSut = (field: string): RenderResult => {
  return render(
    <Context.Provider value={{ state: {} }}>
      <Input name={field}/>
    </Context.Provider>
  )
}

describe('Input component', () => {
  it('should start as readonly', () => {
    const field = faker.database.column()
    const sut = makeSut(field)
    expect((sut.getByTestId(field) as HTMLInputElement).readOnly).toBe(true)
  })

  it('should make readonly falsy on input focus', () => {
    const field = faker.database.column()
    const sut = makeSut(field)
    const input = sut.getByTestId(field) as HTMLInputElement
    fireEvent.focus(input)
    expect(input.readOnly).toBe(false)
  })
})
