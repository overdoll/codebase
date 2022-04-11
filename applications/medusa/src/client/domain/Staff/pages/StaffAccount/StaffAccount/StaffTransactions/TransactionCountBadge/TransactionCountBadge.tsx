import { HStack, Text } from '@chakra-ui/react'
import { SmallBackgroundBox } from '@//:modules/content/PageLayout'
import NumberBadge from '../../../../../../../../modules/content/ContentHints/NumberBadge/NumberBadge'
import { ReactNode } from 'react'

interface Props {
  value: number
  text: ReactNode
  colorScheme: string
}

export default function TransactionCountBadge ({
  value,
  text,
  colorScheme
}: Props): JSX.Element {
  if (value <= 0) {
    return <></>
  }

  return (
    <SmallBackgroundBox>
      <HStack align='center' spacing={4} justify='space-between'>
        <Text fontSize='md'>
          {text}
        </Text>
        <NumberBadge
          size='md'
          value={value}
          colorScheme={colorScheme}
        />
      </HStack>
    </SmallBackgroundBox>
  )
}
