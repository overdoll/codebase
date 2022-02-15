import { graphql, useFragment, useMutation } from 'react-relay/hooks'
import { ChangeCategoryThumbnailFragment$key } from '@//:artifacts/ChangeCategoryThumbnailFragment.graphql'
import { Collapse, Flex, Stack, useDisclosure } from '@chakra-ui/react'
import { PageSectionTitle, PageSectionWrap, ResourceIcon } from '@//:modules/content/PageLayout'
import { t, Trans } from '@lingui/macro'
import Button from '@//:modules/form/Button/Button'
import SingleFileImageUpload from '@//:modules/content/Interactables/SingleFileImageUpload/SingleFileImageUpload'
import { ChangeCategoryThumbnailMutation } from '@//:artifacts/ChangeCategoryThumbnailMutation.graphql'
import { useToast } from '@//:modules/content/ThemeComponents'

interface Props {
  query: ChangeCategoryThumbnailFragment$key
}

const Fragment = graphql`
  fragment ChangeCategoryThumbnailFragment on Category {
    id
    thumbnail {
      ...ResourceIconFragment
    }
  }
`

const Mutation = graphql`
  mutation ChangeCategoryThumbnailMutation($input: UpdateCategoryThumbnailInput!) {
    updateCategoryThumbnail(input: $input) {
      category {
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

export default function ChangeCategoryThumbnail ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const [commit, isPending] = useMutation<ChangeCategoryThumbnailMutation>(Mutation)

  const {
    onToggle: OnToggleForm,
    isOpen: isOpenForm
  } = useDisclosure()

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
            Category Thumbnail
          </Trans>
        </PageSectionTitle>
      </PageSectionWrap>
      <Stack spacing={2}>
        <Flex w='100%' align='center' justify='center'>
          <ResourceIcon w={16} h={16} query={data.thumbnail} />
        </Flex>
        <Button
          variant='solid'
          colorScheme='gray'
          onClick={OnToggleForm}
          size='sm'
        >
          <Trans>
            Change Category Thumbnail
          </Trans>
        </Button>
        <Collapse in={isOpenForm} animateOpacity>
          <SingleFileImageUpload
            onCompleted={onCompleted}
            isDisabled={isPending}
          />
        </Collapse>
      </Stack>
    </>
  )
}
