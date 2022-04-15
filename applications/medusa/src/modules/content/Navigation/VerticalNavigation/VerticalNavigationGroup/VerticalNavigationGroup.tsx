import { Collapse, Heading, HStack, Stack, useDisclosure } from '@chakra-ui/react'
import { FunctionComponent, ReactNode } from 'react'
import { ArrowButtonDown, ArrowButtonUp } from '@//:assets/icons'
import { ClickableBox, Icon } from '../../../PageLayout'
import { useRouter } from 'next/router'

interface Props {
  title: ReactNode
  icon: FunctionComponent<any>
  baseUrl: string
  children: ReactNode
}

export default function VerticalNavigationGroup ({
  title,
  icon,
  baseUrl,
  children
}: Props): JSX.Element {
  const { asPath } = useRouter()

  const isActive = asPath.includes(baseUrl)

  const {
    isOpen,
    onToggle
  } = useDisclosure({ defaultIsOpen: isActive })

  const IconComponent = (): JSX.Element => {
    const color = isActive
      ? 'gray.00'
      : 'gray.200'

    return (
      <Icon
        icon={icon}
        w={4}
        h={4}
        fill={color}
      />
    )
  }

  return (
    <Stack spacing={1}>
      <ClickableBox
        h={10}
        onClick={onToggle}
        borderRadius='md'
        _hover={{ bg: isActive ? 'gray.900' : 'initial' }}
        _active={{ bg: isActive ? 'gray.900' : 'transparent' }}
        bg={isActive
          ? 'gray.900'
          : 'transparent'}
      >
        <HStack
          w='100%'
          align='center'
          justify='space-between'
          spacing={4}
          px={1}
        >
          <HStack spacing={3} align='center'>
            <IconComponent />
            <Heading
              color={isActive
                ? 'gray.00'
                : 'gray.200'}
              fontSize='md'
              lineHeight={1}
            >
              {title}
            </Heading>
          </HStack>
          <Icon
            icon={isOpen ? ArrowButtonUp : ArrowButtonDown}
            w={2}
            h={2}
            fill={isActive ? 'gray.00' : 'gray.200'}
          />
          )
        </HStack>
      </ClickableBox>
      <Collapse in={isOpen} animateOpacity>
        <Stack spacing={1}>
          {children}
        </Stack>
      </Collapse>
    </Stack>
  )
}
