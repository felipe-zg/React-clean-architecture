import React, { useContext } from 'react'
import Context from '@/presentation/context/form/form-context'

import Styles from './styles.scss'

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

const Input: React.FC<Props> = (props: Props) => {
  const { errorState } = useContext(Context)

  const enableInput = (event: React.FocusEvent<HTMLInputElement>): void => {
    event.target.readOnly = false
  }

  const getStatus = (): string => '🔴'

  const getTitle = (): string => errorState[props.name]

  return (
    <div className={Styles.inputWrap}>
      <input {...props} readOnly onFocus={enableInput}/>
      <span data-testid={`${props.name}-status`} title={getTitle()} className={Styles.status}>{getStatus()}</span>
    </div>
  )
}

export default Input
