import React, { useContext, useRef } from 'react'
import Context from '@/presentation/context/form/form-context'

import Styles from './styles.scss'

type Props = React.DetailedHTMLProps<
React.InputHTMLAttributes<HTMLInputElement>,
HTMLInputElement
>

const Input: React.FC<Props> = (props: Props) => {
  const { state, setState } = useContext(Context)
  const inputRef = useRef<HTMLInputElement>()
  const error = state[`${props.name}Error`]

  const enableInput = (event: React.FocusEvent<HTMLInputElement>): void => {
    event.target.readOnly = false
  }

  const handleChange = (event: React.FocusEvent<HTMLInputElement>): void => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    })
  }

  const getStatus = (): string => (error ? '🔴' : '🟢')

  const getTitle = (): string => error || 'Tudo certo!'

  return (
    <div className={Styles.inputWrap}>
      <input
        {...props}
        ref={inputRef}
        data-testid={props.name}
        placeholder=" "
        readOnly
        onFocus={enableInput}
        onChange={handleChange}
      />
      <label onClick={() => inputRef.current.focus()}>
        {props.placeholder}
      </label>
      <span
        data-testid={`${props.name}-status`}
        title={getTitle()}
        className={Styles.status}
      >
        {getStatus()}
      </span>
    </div>
  )
}

export default Input
