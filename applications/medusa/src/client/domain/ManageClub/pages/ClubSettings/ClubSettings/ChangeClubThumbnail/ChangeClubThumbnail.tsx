import { graphql, useFragment, useMutation } from 'react-relay/hooks'
import { ChangeClubThumbnailFragment$key } from '@//:artifacts/ChangeClubThumbnailFragment.graphql'
import { ChangeClubThumbnailMutation } from '@//:artifacts/ChangeClubThumbnailMutation.graphql'
import { Collapse, Flex, useDisclosure } from '@chakra-ui/react'
import {
  ListSpacer,
  PageSectionDescription,
  PageSectionTitle,
  PageSectionWrap,
  ResourceIcon
} from '@//:modules/content/PageLayout'
import { t, Trans } from '@lingui/macro'
import Button from '@//:modules/form/Button/Button'
import SingleFileImageUpload
  from '../../../../../../../modules/content/Interactables/SingleFileImageUpload/SingleFileImageUpload'
import { useToast } from '@//:modules/content/ThemeComponents'

interface Props {
  query: ChangeClubThumbnailFragment$key | null
}

const Fragment = graphql`
  fragment ChangeClubThumbnailFragment on Club {
    id
    thumbnail {
      ...ResourceIconFragment
    }
  }
`

const Mutation = graphql`
  mutation ChangeClubThumbnailMutation ($id: ID!, $thumbnail: String!) {
    updateClubThumbnail(input: {id: $id, thumbnail: $thumbnail}) {
      club {
        id
        name
        thumbnail {
          type
          urls {
            url
            mimeType
          }
        }
      }
    }
  }
`

export default function ChangeClubThumbnail ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const [changeThumbnail, isChangingThumbnail] = useMutation<ChangeClubThumbnailMutation>(Mutation)

  const {
    isOpen,
    onToggle
  } = useDisclosure()

  const notify = useToast()

  const onCompleted = (id): void => {
    if (data?.id == null) return
    if (id == null) return

    changeThumbnail({
      variables: {
        id: data?.id,
        thumbnail: id
      },
      onCompleted () {
        notify({
          status: 'success',
          title: t`Successfully updated your club thumbnail`
        })
      },
      onError () {
        notify({
          status: 'error',
          title: t`There was an error updating your club thumbnail`
        })
      }
    }
    )
  }

  return (
    <>
      <PageSectionWrap>
        <PageSectionTitle colorScheme='teal'>
          <Trans>
            Club Thumbnail
          </Trans>
        </PageSectionTitle>
        <PageSectionDescription>
          A square image is recommended.
        </PageSectionDescription>
      </PageSectionWrap>
      <ListSpacer>
        <Flex w='100%' align='center' justify='center'>
          <ResourceIcon w={16} h={16} query={data?.thumbnail} />
        </Flex>
        <Button
          variant='solid'
          colorScheme='gray'
          onClick={onToggle}
          size='sm'
        >
          <Trans>
            Change Club Thumbnail
          </Trans>
        </Button>
        <Collapse in={isOpen} animateOpacity>
          <SingleFileImageUpload
            onCompleted={onCompleted}
            isDisabled={isChangingThumbnail}
          />
        </Collapse>
      </ListSpacer>

    </>
  )
}
