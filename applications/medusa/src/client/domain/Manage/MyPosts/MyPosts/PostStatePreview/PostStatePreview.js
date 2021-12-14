/**
 * @flow
 */
import type { Node } from 'react'
import { CircularProgress, CircularProgressLabel, Flex, Heading, SimpleGrid } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { ClickableBox, SmallBackgroundBox, SmallMenuButton, SmallMenuItem } from '@//:modules/content/PageLayout'
import { graphql } from 'react-relay/hooks'
import type { PostStatePreviewFragment$key } from '@//:artifacts/PostStatePreviewFragment.graphql'
import { useFragment } from 'react-relay'
import ResourceItem from '@//:modules/content/DataDisplay/ResourceItem/ResourceItem'
import useCheckRequirements
  from '../../../CreatePost/FileUploader/content/PostCreator/UpdatePostFlow/FlowHeader/useCheckRequirements'
import progressScore
  from '../../../CreatePost/FileUploader/content/PostCreator/UpdatePostFlow/FlowHeader/progressScore'
import { DeleteBin } from '../../../../../../assets/icons/interface'
import { useHistory } from '@//:modules/routing'

type Props = {
  query: PostStatePreviewFragment$key,
};

const PostStatePreviewFragmentGQL = graphql`
  fragment PostStatePreviewFragment on Post {
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

export default function PostStatePreview ({ query }: Props): Node {
  const data = useFragment(PostStatePreviewFragmentGQL, query)

  const history = useHistory()

  const [t] = useTranslation('manage')

  const limitedContent = data.content.slice(0, 3)

  const [content, audience, brand, categories, characters] = useCheckRequirements({ query: data })

  const score = progressScore([content, audience, brand, categories, characters])

  const selectPost = () => {
    history.push(`/configure/create_post?id=${data.reference}`)
  }

  const DisplayContentGrid = () => {
    return (
      <SimpleGrid
        h='100%'
        spacing={0}
        columns={limitedContent.length > 1 ? 2 : 1}
      >
        {limitedContent.map((item, index) =>
          <ResourceItem
            h='100%'
            key={index}
            type={item.type}
            urls={item.urls}
          />
        )}
        {data.content.length > 4 && (<Flex
          align='center'
          justify='center'
                                     >
          <Heading
            color='gray.200'
            fontSize='lg'
          >
            +{data.content.length - limitedContent.length}
          </Heading>
        </Flex>)}
      </SimpleGrid>
    )
  }

  return (
    <Flex
      h='100%'
      direction='column'
    >
      <Flex
        direction='column'
        h='78%'
      >
        <ClickableBox
          borderBottomLeftRadius={0}
          borderBottomRightRadius={0}
          onClick={selectPost}
          p={0}
          overflow='hidden'
          position='relative'
          h='100%'
        >
          <Flex
            h='100%'
            position='relative'
            direction='column'
            justify='space-between'
          >
            <DisplayContentGrid />
            <Flex
              bg='dimmers.400'
              h='100%'
              w='100%'
              justify='center'
              align='center'
              position='absolute'
            >
              <CircularProgress
                color={score >= 100 ? 'green.500' : 'primary.500'}
                size={28}
                trackColor='transparent'
                thickness={6}
                value={score}
              >
                <CircularProgressLabel
                  color='gray.00'
                  fontSize='xl'
                >
                  {score}%
                </CircularProgressLabel>
              </CircularProgress>
            </Flex>
          </Flex>
        </ClickableBox>
      </Flex>
      <Flex
        align='center'
        justify='flex-end'
        h='22%'
      >
        <SmallBackgroundBox
          borderTopLeftRadius={0}
          borderTopRightRadius={0}
          h='100%'
          w='100%'
        >
          <Flex
            h='100%'
            align='center'
            justify='flex-end'
          >
            <SmallMenuButton>
              <SmallMenuItem
                icon={DeleteBin}
                text={t('create_post.flow.drafts.delete')}
                color='orange.300'
              />
            </SmallMenuButton>
          </Flex>
        </SmallBackgroundBox>
      </Flex>
    </Flex>
  )
}
