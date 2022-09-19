import type { PostJoinClubFragment$key } from '@//:artifacts/PostJoinClubFragment.graphql'
import type { PostJoinClubViewerFragment$key } from '@//:artifacts/PostJoinClubViewerFragment.graphql'
import { graphql } from 'react-relay'
import { useFragment } from 'react-relay/hooks'
import { t, Trans } from '@lingui/macro'
import { HStack } from '@chakra-ui/react'
import { Icon } from '../../../../../PageLayout'
import { PlusCircle, PremiumStarHollow, SettingCog } from '@//:assets/icons'
import IconButton from '../../../../../../form/IconButton/IconButton'
import ClubJoinConditionWrapper
  from '@//:domain/slug/club/RootPublicClub/DisposePublicClub/ResultPublicClub/MetaPublicClub/ContainerPublicClub/HeaderPublicClub/ClubWrappers/ClubJoinConditionWrapper/ClubJoinConditionWrapper'
import { useLingui } from '@lingui/react'
import Button from '../../../../../../form/Button/Button'
import LinkIconButton from '../../../../../ThemeComponents/LinkIconButton/LinkIconButton'
import ClubSupportPostConditionWrapper
  from '../ClubSupportPostConditionWrapper/ClubSupportPostConditionWrapper'

interface Props {
  clubQuery: PostJoinClubFragment$key
  viewerQuery: PostJoinClubViewerFragment$key | null
}

const ClubFragment = graphql`
  fragment PostJoinClubFragment on Club {
    name
    slug
    viewerMember {
      isSupporter
    }
    viewerIsOwner
    canSupport
    ...ClubJoinConditionWrapperFragment
    ...ClubSupportPostConditionWrapperFragment
  }
`

const ViewerFragment = graphql`
  fragment PostJoinClubViewerFragment on Account {
    ...ClubJoinConditionWrapperViewerFragment
    ...ClubSupportPostConditionWrapperViewerFragment
  }
`

export default function PostJoinClub ({
  clubQuery,
  viewerQuery
}: Props): JSX.Element {
  const clubData = useFragment(ClubFragment, clubQuery)

  const viewerData = useFragment(ViewerFragment, viewerQuery)

  const { i18n } = useLingui()

  const BUTTON_PROPS = {
    size: 'sm',
    borderRadius: 'lg'
  }

  const ConfigureButton = (): JSX.Element => {
    if (!clubData.viewerIsOwner) {
      return <></>
    }

    return (
      <LinkIconButton
        href={{
          pathname: '/club/[slug]/home',
          query: {
            slug: clubData.slug
          }
        }}
        colorScheme='gray'
        icon={<Icon icon={SettingCog} w={4} h={4} fill='gray.100' />}
        aria-label={i18n._(t`Manage Club`)}
        {...BUTTON_PROPS}
      />
    )
  }

  const JoinButton = (): JSX.Element => {
    if (clubData?.viewerMember !== null) {
      return <></>
    }

    return (
      <ClubJoinConditionWrapper clubQuery={clubData} viewerQuery={viewerData}>
        {props => (
          <IconButton
            aria-label={i18n._(t`Join ${clubData.name}`)}
            colorScheme='primary'
            icon={<Icon icon={PlusCircle} w={4} h={4} fill='primary.900' />}
            {...BUTTON_PROPS}
            {...props}
          />
        )}
      </ClubJoinConditionWrapper>
    )
  }

  const SupportButton = (): JSX.Element => {
    if (!clubData.canSupport) {
      return <></>
    }

    if (clubData?.viewerMember?.isSupporter === true) {
      return <></>
    }

    return (
      <ClubSupportPostConditionWrapper
        clubQuery={clubData}
        viewerQuery={viewerData}
      >
        {props => (
          <Button
            colorScheme='orange'
            {...BUTTON_PROPS}
            leftIcon={<Icon icon={PremiumStarHollow} w={4} h={4} fill='orange.900' />}
            {...props}
          >
            <Trans>Support</Trans>
          </Button>
        )}
      </ClubSupportPostConditionWrapper>
    )
  }

  return (
    <HStack spacing={1}>
      <ConfigureButton />
      <SupportButton />
      <JoinButton />
    </HStack>
  )
}
