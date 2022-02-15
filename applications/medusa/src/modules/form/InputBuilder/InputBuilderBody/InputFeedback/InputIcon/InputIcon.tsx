import { useContext } from 'react'
import { InputBuilderContext } from '../../../InputBuilder'
import { Icon } from '../../../../../content/PageLayout'
import { CheckMark, WarningTriangle } from '@//:assets/icons'
import { Spinner } from '@chakra-ui/react'

export default function InputIcon (): JSX.Element {
  const {
    isPending,
    isValid,
    error
  } = useContext(InputBuilderContext)

  const SuccessIcon = (): JSX.Element => {
    return (
      <Icon
        h='100%'
        icon={CheckMark}
        fill='green.500'
      />
    )
  }

  const ErrorIcon = (): JSX.Element => {
    return (
      <Icon
        h='100%'
        icon={WarningTriangle}
        fill='orange.500'
      />
    )
  }

  const PendingIcon = (): JSX.Element => {
    return <Spinner h={15} w={15} color='gray.200' />
  }

  if (isPending === true) {
    return <PendingIcon />
  }

  if (error != null) {
    return <ErrorIcon />
  }

  if (isValid === true) {
    return <SuccessIcon />
  }

  return <></>
}
