import { Text } from '@chakra-ui/react'
import { SmallBackgroundBox } from '@//:modules/content/PageLayout'

interface Props {
  children: string
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
