import { ButtonProps, Flex, Heading, Stack } from '@chakra-ui/react'
import { forwardRef, ReactNode } from 'react'
import { IconType } from '@//:types/components'
import Icon from '../../../../../../PageLayout/BuildingBlocks/Icon/Icon'
import { ClickableBox } from '../../../../../../PageLayout'

interface Props extends Omit<ButtonProps, 'label'> {
  label?: ReactNode
  icon?: IconType
  isActive: boolean
  children?: ReactNode
}

const MobileHorizontalNavigationDropdownMenuButtonBody = forwardRef(({
  children,
  icon,
  label,
  isActive,
  onClick,
  ...rest
}: Props, forwardRef): JSX.Element => {
  return (
    <Flex h='100%' w='100%'>
      <ClickableBox
        ref={forwardRef}
        ignoreTransition
        onClick={onClick}
        borderRadius='md'
        bg='gray.800'
        p={2}
        w={24}
        h={24}
        whiteSpace='break-spaces'
        {...rest}
      >
        <Stack
          spacing={2}
          align='center'
          justify='center'
        >
          {icon != null && (
            <Flex
              borderRadius='md'
              align='center'
              bg={isActive ? 'primary.300' : 'gray.700'}
              p={1}
            >
              <Icon
                icon={icon}
                p={1}
                w={6}
                h={6}
                fill={isActive ? 'gray.00' : 'gray.100'}
              />
            </Flex>
          )}
          {(icon == null) && children}
          <Heading
            color={icon == null ? (isActive ? 'gray.00' : 'gray.100') : (isActive ? 'primary.300' : 'gray.100')}
            fontSize='sm'
            textAlign='center'
          >
            {label}
          </Heading>
        </Stack>
      </ClickableBox>
    </Flex>
  )
})

export default MobileHorizontalNavigationDropdownMenuButtonBody
