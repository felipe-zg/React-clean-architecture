import React, { useContext } from 'react'
import Context from '@/presentation/context/form/form-context'

import Spinner from '@/presentation/components/Spinner'
import Styles from './styles.scss'

const FormStatus: React.FC = () => {
  const { state, errorState } = useContext(Context)

  return (
    <div data-testid="error-wrap" className={Styles.errorWrap}>
      {state.isLoading && <Spinner className={Styles.spinner}/>}
      {errorState.message && <span className={Styles.error}>{errorState.message}</span>}
    </div>
  )
}

export default FormStatus
