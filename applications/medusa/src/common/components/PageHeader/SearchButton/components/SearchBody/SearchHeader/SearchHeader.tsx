import { Heading, HStack } from '@chakra-ui/react'
import { Icon } from '@//:modules/content/PageLayout'
import { ReactNode } from 'react'
import { IconType } from '@//:types/components'

interface Props {
  icon: IconType
  children: ReactNode
}

export default function SearchHeader ({
  icon,
  children
}: Props): JSX.Element {
  return (
    <HStack
      spacing={{
        base: 1,
        md: 2
      }}
      align='center'
    >
      <Icon
        icon={icon}
        w={{
          base: 3,
          md: 4
        }}
        h={{
          base: 3,
          md: 4
        }}
        fill='gray.100'
      />
      <Heading
        lineHeight={1}
        color='gray.100'
        fontSize={{
          base: 'sm',
          md: 'lg'
        }}
      >
        {children}
      </Heading>
    </HStack>
  )
}
