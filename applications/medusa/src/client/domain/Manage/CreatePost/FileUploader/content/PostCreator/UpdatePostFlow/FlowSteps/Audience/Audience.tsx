import { useEffect } from 'react'
import type { Uppy } from '@uppy/core'
import type { Dispatch, State } from '@//:types/upload'
import type { AudienceFragment$key } from '@//:artifacts/AudienceFragment.graphql'
import { graphql } from 'react-relay/hooks'
import { useFragment } from 'react-relay'
import { Flex } from '@chakra-ui/react'
import { useSingleSelector } from '../../../../../../../../../components/ContentSelection'
import { PageSectionDescription, PageSectionTitle, PageSectionWrap } from '@//:modules/content/PageLayout'
import { EVENTS } from '../../../../../constants/constants'
import RequiredPrompt from '../../../../../components/RequiredPrompt/RequiredPrompt'
import RootAudiences from './RootAudiences/RootAudiences'
import { Trans } from '@lingui/macro'

interface Props {
  uppy: Uppy
  state: State
  dispatch: Dispatch
  query: AudienceFragment$key
}

const AudienceFragmentGQL = graphql`
  fragment AudienceFragment on Post {
    audience {
      id
      title
    }
  }
`

export default function Audience ({
  uppy,
  state,
  dispatch,
  query
}: Props): JSX.Element {
  const data = useFragment(AudienceFragmentGQL, query)

  const [currentSelection, setCurrentSelection] = useSingleSelector({ initialSelection: data?.audience?.id as string })

  useEffect(() => {
    dispatch({
      type: EVENTS.AUDIENCE,
      value: currentSelection
    })
  }, [currentSelection])

  return (
    <>
      <PageSectionWrap>
        <PageSectionTitle>
          <Trans>
            Who is the target audience?
          </Trans>
        </PageSectionTitle>
        <PageSectionDescription>
          <Trans>
            The audience is the group of people that you intended this post for. This will determine whether or not a
            user can see your post based on their set preferences.
          </Trans>
        </PageSectionDescription>
      </PageSectionWrap>
      <RootAudiences selected={currentSelection} onSelect={setCurrentSelection} />
      <Flex justify='center'>
        <RequiredPrompt>
          <Trans>
            Selecting an audience allows us to filter out content that someone would otherwise not prefer to see. We
            only show a person content they are interested in seeing.
          </Trans>
        </RequiredPrompt>
      </Flex>
    </>
  )
}
