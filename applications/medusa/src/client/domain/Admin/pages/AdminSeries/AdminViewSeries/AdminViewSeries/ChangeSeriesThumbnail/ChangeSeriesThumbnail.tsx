import { graphql, useFragment, useMutation } from 'react-relay/hooks'
import { ChangeSeriesThumbnailFragment$key } from '@//:artifacts/ChangeSeriesThumbnailFragment.graphql'
import { Flex, Stack } from '@chakra-ui/react'
import { PageSectionTitle, PageSectionWrap, ResourceIcon } from '@//:modules/content/PageLayout'
import { t, Trans } from '@lingui/macro'
import SingleFileImageUpload from '@//:modules/content/Interactables/SingleFileImageUpload/SingleFileImageUpload'
import { ChangeSeriesThumbnailMutation } from '@//:artifacts/ChangeSeriesThumbnailMutation.graphql'
import { useToast } from '@//:modules/content/ThemeComponents'
import { Collapse, CollapseBody, CollapseButton } from '../../../../../../../components/Collapse/Collapse'

interface Props {
  query: ChangeSeriesThumbnailFragment$key
}

const Fragment = graphql`
  fragment ChangeSeriesThumbnailFragment on Series {
    id
    thumbnail {
      ...ResourceIconFragment
    }
  }
`

const Mutation = graphql`
  mutation ChangeSeriesThumbnailMutation($input: UpdateSeriesThumbnailInput!) {
    updateSeriesThumbnail(input: $input) {
      series {
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

export default function ChangeSeriesThumbnail ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const [commit, isPending] = useMutation<ChangeSeriesThumbnailMutation>(Mutation)

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
          title: t`Successfully updated category thumbnail`
        })
      },
      onError () {
        notify({
          status: 'error',
          title: t`There was an error updating the category thumbnail`
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
            Series Thumbnail
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
