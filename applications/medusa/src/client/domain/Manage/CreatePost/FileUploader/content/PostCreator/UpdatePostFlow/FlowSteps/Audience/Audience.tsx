import { useEffect } from 'react'
import type { Uppy } from '@uppy/core'
import type { Dispatch, State } from '@//:types/upload'
import type { AudienceFragment$key } from '@//:artifacts/AudienceFragment.graphql'
import { graphql } from 'react-relay/hooks'
import { useFragment } from 'react-relay'
import { Flex } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { useSingleSelector } from '../../../../../../../../../components/ContentSelection'
import { PageSectionDescription, PageSectionTitle, PageSectionWrap } from '@//:modules/content/PageLayout'
import { EVENTS } from '../../../../../constants/constants'
import RequiredPrompt from '../../../../../components/RequiredPrompt/RequiredPrompt'
import RootAudiences from './RootAudiences/RootAudiences'

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

  const [t] = useTranslation('manage')

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
          {t('create_post.flow.steps.audience.selector.title')}
        </PageSectionTitle>
        <PageSectionDescription>
          {t('create_post.flow.steps.audience.selector.description')}
        </PageSectionDescription>
      </PageSectionWrap>
      <RootAudiences selected={currentSelection} onSelect={setCurrentSelection} />
      <Flex justify='center'>
        <RequiredPrompt>{t('create_post.flow.steps.audience.selector.required_prompt')}</RequiredPrompt>
      </Flex>
    </>
  )
}
