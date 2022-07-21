import { Badge } from '@chakra-ui/react'
import { SmallBackgroundBox } from '@//:modules/content/PageLayout'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export default function TagBadgeHeader ({
  children
}: Props): JSX.Element {
  return (
    <SmallBackgroundBox>
      <Badge colorScheme='teal' fontFamily='mono' fontSize='xl'>
        {children}
      </Badge>
    </SmallBackgroundBox>
  )
}
