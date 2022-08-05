import { Heading, Stack } from '@chakra-ui/react'
import { Icon } from '@//:modules/content/PageLayout'
import { ManageClubCharactersFragment$key } from '@//:artifacts/ManageClubCharactersFragment.graphql'
import { Trans } from '@lingui/macro'
import { graphql, useFragment } from 'react-relay/hooks'
import { CharacterIdentifier } from '@//:assets/icons'
import LinkButton from '@//:modules/content/ThemeComponents/LinkButton/LinkButton'
import ViewClubCharacters from './ViewClubCharacters/ViewClubCharacters'

interface Props {
  query: ManageClubCharactersFragment$key
}

const Fragment = graphql`
  fragment ManageClubCharactersFragment on Club {
    slug
    charactersCount
    ...ClubInformationBannerFragment
    ...ViewClubCharactersFragment
  }
`

export default function ManageClubCharacters ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  if (data.charactersCount === 0) {
    return (
      <Stack spacing={3} px={4} py={8} bg='gray.800' borderRadius='md' justify='center' align='center'>
        <Icon icon={CharacterIdentifier} w={7} h={7} fill='gray.200' />
        <Heading color='gray.200' textAlign='center' fontSize='lg'>
          You haven't created any club characters yet
        </Heading>
        <LinkButton
          href={{
            pathname: '/club/[slug]/characters/create',
            query: {
              slug: data.slug
            }
          }}
          colorScheme='teal'
          size='lg'
        >
          <Trans>
            Create Character
          </Trans>
        </LinkButton>
      </Stack>
    )
  }

  return (
    <ViewClubCharacters query={data} />
  )
}
