import { CheckCircle, DeleteCircle, InfoCircle, WarningTriangle } from '@//:assets/icons'
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
import { createContext, forwardRef, useContext } from 'react'
import CloseButton from '../CloseButton/CloseButton'

export const statusColors = {
  error: 'orange',
  success: 'green',
  warning: 'orange',
  info: 'teal'
}

const statusIcons = {
  error: DeleteCircle,
  success: CheckCircle,
  warning: WarningTriangle,
  info: InfoCircle
}

interface AlertOptions {
  status?: keyof typeof statusColors
}

type AlertPropsOptions = AlertProps & AlertOptions & HTMLChakraProps<any>

const AlertContext = createContext<AlertOptions>({ status: 'info' })

export const Alert = forwardRef<any, AlertPropsOptions>(({
  status = 'info',
  ...rest
}: AlertPropsOptions, forwardRef): JSX.Element => {
  const colorScheme = statusColors[status]

  return (
    <AlertContext.Provider value={{ status }}>
      <ChakraAlert
        ref={forwardRef}
        variant='subtle'
        colorScheme={colorScheme}
        {...rest}
      />
    </AlertContext.Provider>
  )
})

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
      borderRadius='full'
      position='absolute'
      right={2}
      top={2}
      color={`${colorScheme}.400`}
      aria-label='Close Alert'
      {...rest}
    />
  )
}
