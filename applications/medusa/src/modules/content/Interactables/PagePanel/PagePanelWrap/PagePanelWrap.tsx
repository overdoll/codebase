import { Flex, HStack } from '@chakra-ui/react'
import Icon from '../../../PageLayout/Flair/Icon/Icon'
import { ExternalLink, Link } from '../../../../routing'
import { ArrowButtonRight } from '@//:assets/icons/navigation'
import { ClickableBox } from '../../../PageLayout'
import { ReactNode } from 'react'
import { ShareExternalLink } from '@//:assets/icons/interface'

interface Props {
  children: ReactNode
  path: string
  disabled?: boolean
  isExternal?: boolean
}

export default function PagePanelWrap ({
  path,
  children,
  disabled,
  isExternal = false
}: Props): JSX.Element {
  const BoxComponent = (): JSX.Element => <ClickableBox disabled={disabled} p={3}>
    <Flex justify='space-between'>
      <HStack
        spacing={3}
        w='100%'
        align='center'
      >
        {children}
      </HStack>
      <Flex
        w={6}
        ml={1}
        align='center'
        justify='center'
      >
        <Icon
          icon={isExternal ? ShareExternalLink : ArrowButtonRight}
          w={6}
          fill='gray.500'
        />
      </Flex>
    </Flex>
  </ClickableBox>

  if (isExternal) {
    return (
      <ExternalLink to={`https://${path}`}>
        <BoxComponent />
      </ExternalLink>
    )
  }

  return (
    <Link
      disabled={disabled}
      to={path}
    >
      <BoxComponent />
    </Link>
  )
}
