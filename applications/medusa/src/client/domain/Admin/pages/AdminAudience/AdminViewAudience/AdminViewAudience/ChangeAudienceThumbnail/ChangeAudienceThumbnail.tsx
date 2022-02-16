import { graphql, useFragment, useMutation } from 'react-relay/hooks'
import { ChangeAudienceThumbnailFragment$key } from '@//:artifacts/ChangeAudienceThumbnailFragment.graphql'
import { Flex, Stack } from '@chakra-ui/react'
import { PageSectionTitle, PageSectionWrap, ResourceIcon } from '@//:modules/content/PageLayout'
import { t, Trans } from '@lingui/macro'
import SingleFileImageUpload from '@//:modules/content/Interactables/SingleFileImageUpload/SingleFileImageUpload'
import { ChangeAudienceThumbnailMutation } from '@//:artifacts/ChangeAudienceThumbnailMutation.graphql'
import { useToast } from '@//:modules/content/ThemeComponents'
import { Collapse, CollapseBody, CollapseButton } from '../../../../../../../components/Collapse/Collapse'

interface Props {
  query: ChangeAudienceThumbnailFragment$key
}

const Fragment = graphql`
  fragment ChangeAudienceThumbnailFragment on Audience {
    id
    thumbnail {
      ...ResourceIconFragment
    }
  }
`

const Mutation = graphql`
  mutation ChangeAudienceThumbnailMutation($input: UpdateAudienceThumbnailInput!) {
    updateAudienceThumbnail(input: $input) {
      audience {
        id
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

export default function ChangeAudienceThumbnail ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const [commit, isPending] = useMutation<ChangeAudienceThumbnailMutation>(Mutation)

  const notify = useToast()

  const onCompleted = (id): void => {
    if (id == null) return

    commit({
      variables: {
        input: {
          id: data.id,
          thumbnail: id
        }
      },
      onCompleted () {
        notify({
          status: 'success',
          title: t`Successfully updated audience thumbnail`
        })
      },
      onError () {
        notify({
          status: 'error',
          title: t`There was an error updating the audience thumbnail`
        })
      }
    }
    )
  }

  return (
    <>
      <PageSectionWrap>
        <PageSectionTitle>
          <Trans>
            Audience Thumbnail
          </Trans>
        </PageSectionTitle>
      </PageSectionWrap>
      <Stack spacing={2}>
        <Flex w='100%' align='center' justify='center'>
          <ResourceIcon w={16} h={16} query={data.thumbnail} />
        </Flex>
        <Collapse>
          <CollapseButton>
            <Trans>
              Change Thumbnail
            </Trans>
          </CollapseButton>
          <CollapseBody>
            <SingleFileImageUpload
              onCompleted={onCompleted}
              isDisabled={isPending}
            />
          </CollapseBody>
        </Collapse>
      </Stack>
    </>
  )
}
