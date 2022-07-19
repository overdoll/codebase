import { HStack } from '@chakra-ui/react'
import { useQueryParams } from 'use-query-params'
import { configMap } from '../SearchButton/constants'
import { Trans } from '@lingui/macro'
import { Icon } from '@//:modules/content/PageLayout'
import { FreshLeaf, RisingGraph } from '@//:assets/icons'
import Button from '@//:modules/form/Button/Button'
import { FunctionComponent, ReactNode } from 'react'
import { IconType } from '@//:types/components'

interface OrderButtonProps {
  children: ReactNode
  param: string
  icon: IconType
  defaultActive?: boolean
}

export default function PostOrderButton (): JSX.Element {
  return (
    <HStack align='center' spacing={1}>
      <OrderButton
        param='TOP'
        defaultActive
        icon={RisingGraph}
      >
        <Trans>
          Best
        </Trans>
      </OrderButton>
      <OrderButton
        param='NEW'
        icon={FreshLeaf}
      >
        <Trans>
          Fresh
        </Trans>
      </OrderButton>
    </HStack>
  )
}

const OrderButton = ({
  children,
  param,
  icon,
  defaultActive
}: OrderButtonProps): JSX.Element => {
  const [query, setQuery] = useQueryParams(configMap)

  const isActive = query.sort == null ? (defaultActive ?? false) : query.sort === param

  const onClick = (): void => {
    setQuery({ sort: param })
  }

  return (
    <Button
      onClick={onClick}
      colorScheme={isActive ? 'primary' : 'gray'}
      leftIcon={<Icon icon={icon} fill={isActive ? 'primary.900' : 'gray.100'} w={4} h={4} />}
      borderRadius='md'
      size='sm'
    >
      {children}
    </Button>
  )
}
