import { graphql, useFragment } from 'react-relay/hooks'
import { ButtonsPublicClubFragment$key } from '@//:artifacts/ButtonsPublicClubFragment.graphql'
import { HStack } from '@chakra-ui/react'
import { Trans } from '@lingui/macro'
import LinkButton from '@//:modules/content/ThemeComponents/LinkButton/LinkButton'
import { Icon } from '@//:modules/content/PageLayout'
import { SearchSmall } from '@//:assets/icons'

interface Props {
  clubQuery: ButtonsPublicClubFragment$key
}

const ClubFragment = graphql`
  fragment ButtonsPublicClubFragment on Club {
    slug
  }
`

export default function ButtonsPublicClub (props: Props): JSX.Element {
  const { clubQuery } = props

  const clubData = useFragment(ClubFragment, clubQuery)

  const BUTTON_PROPS = {
    size: {
      base: 'sm',
      md: 'md'
    }
  }

  return (
    <HStack
      overflowX={{
        base: 'scroll',
        md: 'visible'
      }}
      py={1}
      justify='flex-end'
      spacing={1}
    >
      <LinkButton
        {...BUTTON_PROPS}
        href={{
          pathname: '/[slug]/posts',
          query: {
            slug: clubData.slug,
            sort: 'ALGORITHM'
          }
        }}
        leftIcon={<Icon icon={SearchSmall} fill='gray.100' w={4} h={4} />}
      >
        <Trans>
          All Posts
        </Trans>
      </LinkButton>
    </HStack>
  )
}
