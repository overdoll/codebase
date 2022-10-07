import { ButtonProps, Flex, Heading, HStack } from '@chakra-ui/react'
import { forwardRef, ReactNode } from 'react'
import { IconType } from '@//:types/components'
import Icon from '../../../../../../PageLayout/BuildingBlocks/Icon/Icon'
import { ClickableBox } from '../../../../../../PageLayout'

interface Props extends Omit<ButtonProps, 'label'> {
  label?: ReactNode
  icon?: IconType
  isActive: boolean
  color?: string
  children?: ReactNode
}

const HorizontalNavigationDropdownMenuButtonBody = forwardRef((props: Props, forwardRef): JSX.Element => {
  const {
    children,
    icon,
    color,
    label,
    isActive,
    onClick,
    ...rest
  } = props

  return (
    <Flex h='100%' w='100%'>
      <ClickableBox
        ref={forwardRef}
        ignoreTransition
        onClick={onClick}
        borderRadius='md'
        bg={isActive ? 'gray.900' : 'gray.800'}
        p={2}
        whiteSpace='break-spaces'
        {...rest}
      >
        <HStack
          p={1}
          spacing={3}
          w='100%'
          h='100%'
          align='center'
          justify={{
            base: 'center',
            md: 'flex-start'
          }}
          direction='row'
        >
          {icon != null && (
            <Flex
              borderRadius='md'
              align='center'
              p={1}
              bg={isActive ? 'primary.300' : 'gray.500'}
            >
              <Icon
                icon={icon}
                w={6}
                h={6}
                p={1}
                fill={isActive ? 'gray.00' : 'gray.100'}
              />
            </Flex>
          )}
          {(icon == null) && children}
          <Heading
            color={icon == null ? (isActive ? 'gray.00' : 'gray.100') : (isActive ? 'primary.300' : 'gray.100')}
            fontSize='lg'
            textAlign={{
              md: 'left',
              base: 'center'
            }}
          >
            {label}
          </Heading>
        </HStack>
      </ClickableBox>
    </Flex>
  )
})

export default HorizontalNavigationDropdownMenuButtonBody
