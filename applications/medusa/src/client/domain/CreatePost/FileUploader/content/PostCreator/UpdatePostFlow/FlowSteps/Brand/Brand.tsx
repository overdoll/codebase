import { useEffect } from 'react'
import { PageSectionDescription, PageSectionTitle, PageSectionWrap } from '@//:modules/content/PageLayout'
import type { Uppy } from '@uppy/core'
import type { Dispatch, State } from '@//:types/upload'
import type { BrandFragment$key } from '@//:artifacts/BrandFragment.graphql'
import { graphql } from 'react-relay/hooks'
import { useFragment } from 'react-relay'
import { useSingleSelector } from '../../../../../../../../components/ContentSelection'
import { Flex } from '@chakra-ui/react'
import RequiredPrompt from '../../../../../components/RequiredPrompt/RequiredPrompt'
import { EVENTS } from '../../../../../constants/constants'
import RootBrands from './RootBrands/RootBrands'
import { Trans } from '@lingui/macro'

interface Props {
  uppy: Uppy
  state: State
  dispatch: Dispatch
  query: BrandFragment$key
}

const BrandFragmentGQL = graphql`
  fragment BrandFragment on Post {
    club {
      id
    }
  }
`

export default function Brand ({
  uppy,
  state,
  dispatch,
  query
}: Props): JSX.Element {
  const data = useFragment(BrandFragmentGQL, query)

  const determineDefaultBrand = (): string | null => {
    if (data?.brand?.id == null) {
      return null
    }
    return data.brand.id
  }

  const [currentSelection, setCurrentSelection] = useSingleSelector({ initialSelection: determineDefaultBrand() })

  useEffect(() => {
    dispatch({
      type: EVENTS.BRAND,
      value: currentSelection
    })
  }, [currentSelection])

  return (
    <>
      <PageSectionWrap>
        <PageSectionTitle>
          <Trans>
            What is the brand?
          </Trans>
        </PageSectionTitle>
        <PageSectionDescription>
          <Trans>
            A brand is the artist or group of artists that created the content that belongs to the post.
          </Trans>
        </PageSectionDescription>
      </PageSectionWrap>
      <RootBrands selected={currentSelection} onSelect={setCurrentSelection} />
      <Flex justify='center'>
        <RequiredPrompt><Trans>Brands are an easy way to manage your content and allow you to have a unique link that
          can be shared anywhere.
        </Trans>
        </RequiredPrompt>
      </Flex>
    </>
  )
}
