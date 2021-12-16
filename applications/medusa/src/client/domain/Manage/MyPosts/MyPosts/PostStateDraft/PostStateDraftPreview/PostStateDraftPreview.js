/**
 * @flow
 */
import type { Node } from 'react'
import { CircularProgress, CircularProgressLabel, Flex, Heading, SimpleGrid, Progress } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { ClickableBox, SmallBackgroundBox, SmallMenuButton, SmallMenuItem } from '@//:modules/content/PageLayout'
import { graphql } from 'react-relay/hooks'
import type { PostStateDraftPreviewFragment$key } from '@//:artifacts/PostStateDraftPreviewFragment.graphql'
import { useFragment } from 'react-relay'
import ResourceItem from '@//:modules/content/DataDisplay/ResourceItem/ResourceItem'
import useCheckRequirements
  from '../../../../CreatePost/FileUploader/content/PostCreator/UpdatePostFlow/FlowHeader/useCheckRequirements'
import progressScore
  from '../../../../CreatePost/FileUploader/content/PostCreator/UpdatePostFlow/FlowHeader/progressScore'
import { DeleteBin } from '../../../../../../../assets/icons/interface'
import { useHistory } from '@//:modules/routing'
import Icon from '@//:modules/content/Icon/Icon'
import { ContentBrushPen } from '../../../../../../../assets/icons/navigation'

type Props = {
  query: PostStateDraftPreviewFragment$key,
};

const PostStatePreviewFragmentGQL = graphql`
  fragment PostStateDraftPreviewFragment on Post {
    id
    reference
    ...useCheckRequirementsFragment
    content {
      type
      urls {
        url
        mimeType
      }
    }
  }
`

export default function PostStateDraftPreview ({ query }: Props): Node {
  const data = useFragment(PostStatePreviewFragmentGQL, query)

  const history = useHistory()

  const [t] = useTranslation('manage')

  const limitedContent = data.content.slice(0, 3)

  const [content, audience, brand, categories, characters] = useCheckRequirements({ query: data })

  const score = progressScore([content, audience, brand, categories, characters])

  const selectPost = () => {
    history.push(`/configure/create-post?id=${data.reference}`)
  }

  const DisplayContentGrid = () => {
    return (
      <SimpleGrid h='100%' spacing={0} columns={limitedContent.length > 1 ? 2 : 1}>
        {limitedContent.map((item, index) =>
          <ResourceItem h='100%' key={index} type={item.type} urls={item.urls} />
        )}
        {data.content.length > 4 && (<Flex align='center' justify='center'>
          <Heading color='gray.200' fontSize='lg'>
            +{data.content.length - limitedContent.length}
          </Heading>
        </Flex>)}
      </SimpleGrid>
    )
  }

  return (
    <Flex w='100%' h='100%' direction='column'>
      <Flex direction='column' h='78%'>
        <ClickableBox
          borderBottomLeftRadius={0}
          borderBottomRightRadius={0}
          onClick={selectPost}
          p={0}
          overflow='hidden'
          position='relative'
          h='100%'
        >
          <Flex h='100%' position='relative' direction='column' justify='space-between'>
            <DisplayContentGrid />
            <Flex bg='dimmers.400' h='100%' w='100%' justify='center' align='center' position='absolute'>
              <Icon
                icon={ContentBrushPen}
                fill='gray.50'
                w={12}
                h={12}
              />
            </Flex>
          </Flex>
        </ClickableBox>
      </Flex>
      <Flex align='center' justify='flex-end' h='22%'>
        <SmallBackgroundBox
          borderTopLeftRadius={0}
          borderTopRightRadius={0}
          h='100%'
          w='100%'
        >
          <Flex h='100%' align='center' justify='space-between'>
            <Progress colorScheme={score >= 100 ? 'green' : 'teal'} w='100%' size='md' value={score} />
            <SmallMenuButton ml={2}>
              <SmallMenuItem
                icon={DeleteBin}
                text={t('my_posts.drafts.discard')}
                color='orange.300'
              />
            </SmallMenuButton>
          </Flex>
        </SmallBackgroundBox>
      </Flex>
    </Flex>
  )
}
