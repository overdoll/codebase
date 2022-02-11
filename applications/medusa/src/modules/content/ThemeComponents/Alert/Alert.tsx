import { CheckCircle, InfoCircle, RemoveCross, WarningTriangle } from '@//:assets/icons'
import {
  Alert as ChakraAlert,
  AlertDescription as ChakraAlertDescription,
  AlertDescriptionProps,
  AlertIcon as ChakraAlertIcon,
  AlertIconProps,
  AlertProps,
  AlertTitle as ChakraAlertTitle,
  AlertTitleProps,
  CloseButtonProps,
  HTMLChakraProps
} from '@chakra-ui/react'
import { createContext, useContext } from 'react'
import CloseButton from '../CloseButton/CloseButton'

export const statusColors = {
  error: 'orange',
  success: 'green',
  warning: 'orange',
  info: 'teal'
}

const statusIcons = {
  error: RemoveCross,
  success: CheckCircle,
  warning: WarningTriangle,
  info: InfoCircle
}

interface AlertOptions {
  status?: keyof typeof statusColors
}

const AlertContext = createContext<AlertOptions>({ status: 'info' })

export const Alert = ({
  status = 'info',
  ...rest
}: AlertProps & AlertOptions & HTMLChakraProps<any>): JSX.Element => {
  const colorScheme = statusColors[status]

  return (
    <AlertContext.Provider value={{ status }}>
      <ChakraAlert
        variant='subtle'
        colorScheme={colorScheme}
        {...rest}
      />
    </AlertContext.Provider>
  )
}

export const AlertIcon = ({ ...rest }: AlertIconProps & HTMLChakraProps<any>): JSX.Element => {
  const context = useContext(AlertContext)

  const icon = statusIcons[context.status ?? 'info']

  return (
    <ChakraAlertIcon
      as={icon}
      {...rest}
    />
  )
}

export const AlertTitle = ({ ...rest }: AlertTitleProps & HTMLChakraProps<any>): JSX.Element => {
  return (
    <ChakraAlertTitle
      {...rest}
    />
  )
}

export const AlertDescription = ({ ...rest }: AlertDescriptionProps & HTMLChakraProps<any>): JSX.Element => {
  return (
    <ChakraAlertDescription
      {...rest}
    />
  )
}

export const AlertCloseButton = ({ ...rest }: CloseButtonProps): JSX.Element => {
  const context = useContext(AlertContext)

  const colorScheme = statusColors[context.status ?? 'info']
  return (
    <CloseButton
      position='absolute'
      right={2}
      top={2}
      color={`${colorScheme}.400`}
      aria-label='Close Alert'
      {...rest}
    />
  )
}
