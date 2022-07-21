import { Text } from '@chakra-ui/react'
import { SmallBackgroundBox } from '@//:modules/content/PageLayout'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export default function TagHeader ({
  children
}: Props): JSX.Element {
  return (
    <SmallBackgroundBox>
      <Text fontFamily='mono' fontSize='2xl' color='gray.00'>{children}</Text>
    </SmallBackgroundBox>
  )
}
