import { Heading, HStack, Wrap, WrapItem } from '@chakra-ui/react'
import { graphql, useFragment } from 'react-relay'
import type {
  PostClickableCategoriesFragment$data,
  PostClickableCategoriesFragment$key
} from '@//:artifacts/PostClickableCategoriesFragment.graphql'
import { ClickableBox, Icon, SmallBackgroundBox } from '../../../../../PageLayout'
import { useLimiter } from '../../../../Limiter'
import { DeepWritable } from 'ts-essentials'
import { NavigationMenuHorizontal } from '@//:assets/icons'
import ClickableCategory from './ClickableCategory/ClickableCategory'

interface Props {
  query: PostClickableCategoriesFragment$key | null
}

const Fragment = graphql`
  fragment PostClickableCategoriesFragment on Post {
    categories {
      id
      ...ClickableCategoryFragment
    }
  }
`

export default function PostClickableCategories ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const {
    constructedData,
    onExpand,
    hasExpansion,
    hiddenData
  } = useLimiter<DeepWritable<PostClickableCategoriesFragment$data['categories']>>({
    data: data?.categories as DeepWritable<PostClickableCategoriesFragment$data['categories']> ?? [],
    amount: 12
  })

  return (
    <Wrap overflow='show'>
      {constructedData.map((item) =>
        <WrapItem key={item.id}>
          <ClickableCategory query={item} />
        </WrapItem>
      )}
      {hasExpansion && (
        <WrapItem>
          <ClickableBox borderRadius='semi' p={0} onClick={onExpand}>
            <SmallBackgroundBox py={1} px={2} borderRadius='inherit'>
              <HStack spacing={2} align='center'>
                <Icon
                  w={4}
                  h={4}
                  fill='gray.100'
                  icon={NavigationMenuHorizontal}
                />
                <Heading color='gray.100' fontSize='md'>
                  {hiddenData.length}
                </Heading>
              </HStack>
            </SmallBackgroundBox>
          </ClickableBox>
        </WrapItem>)}
    </Wrap>
  )
}
