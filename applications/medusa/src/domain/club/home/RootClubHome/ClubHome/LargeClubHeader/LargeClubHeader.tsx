import { useFragment } from 'react-relay/hooks'
import type { LargeClubHeaderFragment$key } from '@//:artifacts/LargeClubHeaderFragment.graphql'
import { graphql } from 'react-relay'
import { Heading, HStack } from '@chakra-ui/react'
import ClubIcon from '@//:modules/content/PageLayout/Display/fragments/Icon/ClubIcon/ClubIcon'

interface Props {
  query: LargeClubHeaderFragment$key
}

const Fragment = graphql`
  fragment LargeClubHeaderFragment on Club {
    id
    name
    ...ClubIconFragment
  }
`

export default function LargeClubHeader ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  return (
    <HStack spacing={4} h={16} align='center'>
      <ClubIcon size='xl' clubQuery={data} />
      <Heading
        noOfLines={1}
        fontSize='3xl'
        color='gray.00'
      >
        {data?.name}
      </Heading>
    </HStack>
  )
}
