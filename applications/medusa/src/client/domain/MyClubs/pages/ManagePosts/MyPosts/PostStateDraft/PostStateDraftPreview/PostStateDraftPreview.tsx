import { Flex, Heading, Progress, SimpleGrid } from '@chakra-ui/react'
import { ClickableBox, SmallBackgroundBox, SmallMenuButton, SmallMenuItem } from '@//:modules/content/PageLayout'
import { graphql } from 'react-relay/hooks'
import type { PostStateDraftPreviewFragment$key } from '@//:artifacts/PostStateDraftPreviewFragment.graphql'
import { useFragment } from 'react-relay'
import ResourceItem from '@//:modules/content/DataDisplay/ResourceItem/ResourceItem'
import checkPostRequirements
  from '../../../../CreatePost/components/PostCreator/UpdatePostFlow/FlowHeader/checkPostRequirements'
import progressScore from '../../../../CreatePost/components/PostCreator/UpdatePostFlow/FlowHeader/progressScore'
import { DeleteBin } from '@//:assets/icons/interface'
import { useHistory } from '@//:modules/routing'
import Icon from '@//:modules/content/Icon/Icon'
import { ContentBrushPen } from '@//:assets/icons/navigation'
import { t } from '@lingui/macro'
import generatePath from '@//:modules/routing/generatePath'
import { useParams } from '@//:modules/routing/useParams'

interface Props {
  query: PostStateDraftPreviewFragment$key
}

const PostStatePreviewFragmentGQL = graphql`
  fragment PostStateDraftPreviewFragment on Post {
    reference
    content {
      ...ResourceItemFragment
    }
    ...checkPostRequirementsFragment
  }
`

export default function PostStateDraftPreview ({ query }: Props): JSX.Element {
  const data = useFragment(PostStatePreviewFragmentGQL, query)

  const history = useHistory()

  const limitedContent = data.content.slice(0, 3)

  const match = useParams()

  const postRequirements = checkPostRequirements({ query: data })

  const score = progressScore([postRequirements.hasRequiredAudience, postRequirements.hasRequiredCategories, postRequirements.hasRequiredCharacters, postRequirements.hasRequiredContent])
  const selectPost = (): void => {
    const basePath = generatePath('/club/:slug/:entity', {
      slug: match.slug,
      entity: 'create-post'
    })

    history.push(`${basePath}?post=${data.reference}`)
  }

  const DisplayContentGrid = (): JSX.Element => {
    return (
      <SimpleGrid h='100%' spacing={0} columns={limitedContent.length > 1 ? 2 : 1}>
        {limitedContent.map((item, index) =>
          <ResourceItem h='100%' key={index} query={item} />
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
            <Progress mr={2} colorScheme={score >= 100 ? 'green' : 'teal'} w='100%' size='md' value={score} />
            <SmallMenuButton>
              <SmallMenuItem
                icon={DeleteBin}
                text={t`Discard Draft`}
                color='orange.300'
              />
            </SmallMenuButton>
          </Flex>
        </SmallBackgroundBox>
      </Flex>
    </Flex>
  )
}
