import dynamic from 'next/dynamic'
import { UrlCurationProfileFragment$key } from '@//:artifacts/UrlCurationProfileFragment.graphql'
import { graphql } from 'react-relay'
import { useFragment } from 'react-relay/hooks'
import { useDisclosure } from '@chakra-ui/react'
import { Suspense, useEffect } from 'react'
import { useQueryParam } from 'use-query-params'

const LazyModal = dynamic(
  async () => {
    return await import('../../../../../../../../common/components/CurationProfileModal/CurationProfileModal')
  },
  {
    suspense: true
  }
)

interface Props {
  viewerQuery: UrlCurationProfileFragment$key | null
}

const ViewerFragment = graphql`
  fragment UrlCurationProfileFragment on Account {
    clubMembershipsCount
    curationProfile {
      audience {
        completed
      }
    }
  }
`

export default function UrlCurationProfile (props: Props): JSX.Element {
  const { viewerQuery } = props

  const viewerData = useFragment(ViewerFragment, viewerQuery)

  const [curation, setCuration] = useQueryParam<boolean | null | undefined>('curation')

  const {
    isOpen,
    onOpen,
    onClose
  } = useDisclosure()

  const onCloseModal = (): void => {
    setCuration(undefined)
  }

  useEffect(() => {
    if (curation != null) {
      onOpen()
    } else {
      onClose()
    }
  }, [curation])

  if (!isOpen && (viewerData == null || (viewerData.clubMembershipsCount > 0 && viewerData.curationProfile.audience.completed))) {
    return <></>
  }

  return (
    <Suspense fallback={<></>}>
      <LazyModal isOpen={isOpen} onClose={onCloseModal} />
    </Suspense>
  )
}
