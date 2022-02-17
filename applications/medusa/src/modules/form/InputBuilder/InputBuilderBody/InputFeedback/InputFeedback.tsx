import { InputElementProps, InputRightElement, Spinner } from '@chakra-ui/react'
import { useContext } from 'react'
import { InputBuilderContext } from '../../InputBuilder'
import { useFormContext } from 'react-hook-form'
import { Icon } from '../../../../content/PageLayout'
import { CheckMark, WarningTriangle } from '@//:assets/icons'

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

export default function InputBuilderHeader ({
  children,
  ...rest
}: InputElementProps): JSX.Element {
  const {
    size = 'md',
    isPending,
    id
  } = useContext(InputBuilderContext)

  const {
    formState: {
      errors,
      isDirty,
      isSubmitted
    }
  } = useFormContext()

  const error = errors[id]

  const isValid = isDirty && (error == null) && isSubmitted

  const determinePadding = (): number => {
    if (['xl'].includes(size)) {
      return 5
    }
    if (['md', 'lg'].includes(size)) {
      return 3
    }
    return 2
  }

  const Icon = (): JSX.Element => {
    if (isPending === true) {
      return <PendingIcon />
    }

    if (error != null) {
      return <ErrorIcon />
    }

    if (isValid) {
      return <SuccessIcon />
    }

    return <></>
  }

  if (isPending === true || isValid || error != null) {
    return (
      <InputRightElement
        p={determinePadding()}
        mr={0}
        h='100%'
        pointerEvents='none'
        {...rest}
      >
        <Icon />
      </InputRightElement>
    )
  }

  return <></>
}
