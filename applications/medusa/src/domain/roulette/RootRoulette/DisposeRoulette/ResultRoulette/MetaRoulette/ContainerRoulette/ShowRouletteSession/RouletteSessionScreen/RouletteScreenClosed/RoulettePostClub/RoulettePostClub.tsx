import { graphql } from 'react-relay'
import { RoulettePostClubFragment$key } from '@//:artifacts/RoulettePostClubFragment.graphql'
import { useFragment } from 'react-relay/hooks'
import { Heading, HStack } from '@chakra-ui/react'
import ClubIcon from '@//:modules/content/PageLayout/Display/fragments/Icon/ClubIcon/ClubIcon'

interface Props {
  query: RoulettePostClubFragment$key
}

const Fragment = graphql`
  fragment RoulettePostClubFragment on Club {
    id
    name
    ...ClubIconFragment
  }
`

export default function RoulettePostClub (props: Props): JSX.Element {
  const { query } = props

  const data = useFragment(Fragment, query)

  return (
    <HStack align='center' spacing={2}>
      <ClubIcon size='sm' clubQuery={data} />
      <Heading fontSize='xl' color='gray.00'>
        {data.name}
      </Heading>
    </HStack>
  )
}
