import React, { useContext } from 'react'
import Context from '@/presentation/context/form/form-context'

import Spinner from '@/presentation/components/Spinner'
import Styles from './styles.scss'

const FormStatus: React.FC = () => {
  const { isLoading, errorMessage } = useContext(Context)

  return (
    <div data-testid="error-wrap" className={Styles.errorWrap}>
      {isLoading && <Spinner className={Styles.spinner}/>}
      {errorMessage && <span className={Styles.error}>{errorMessage}</span>}
    </div>
  )
}

export default FormStatus
