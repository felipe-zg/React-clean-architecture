import React, { useContext } from 'react'
import Context from '@/presentation/context/form/form-context'

import Spinner from '@/presentation/components/Spinner'
import Styles from './styles.scss'

const FormStatus: React.FC = () => {
  const { state } = useContext(Context)

  return (
    <div data-testid="error-wrap" className={Styles.errorWrap}>
      {state.isLoading && <Spinner className={Styles.spinner}/>}
      {state.errorMessage && <span data-testid="main-error" className={Styles.error}>{state.errorMessage}</span>}
    </div>
  )
}

export default FormStatus
