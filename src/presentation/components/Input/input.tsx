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

  return (
    <div
      className={Styles.inputWrap}
      data-status={error ? 'invalid' : 'valid'}
      data-testid={`${props.name}-wrap`}
    >
      <input
        {...props}
        ref={inputRef}
        data-testid={props.name}
        title={error}
        placeholder=" "
        readOnly
        onFocus={enableInput}
        onChange={handleChange}
      />
      <label
        data-testid={`${props.name}-label`}
        title={error}
        onClick={() => inputRef.current.focus()}
      >
        {props.placeholder}
      </label>
    </div>
  )
}

export default Input
