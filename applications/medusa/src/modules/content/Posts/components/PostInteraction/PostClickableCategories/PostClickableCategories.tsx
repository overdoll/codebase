import { Heading, HStack, Wrap, WrapItem } from '@chakra-ui/react'
import { graphql, useFragment } from 'react-relay'
import type {
  PostClickableCategoriesFragment$data,
  PostClickableCategoriesFragment$key
} from '@//:artifacts/PostClickableCategoriesFragment.graphql'
import { ClickableBox, Icon, ResourceIcon, SmallBackgroundBox } from '../../../../PageLayout'
import { encodeQueryParams } from 'serialize-query-params'
import { stringify } from 'query-string'
import { configMap } from '../../PostNavigation/PostsSearch/constants'
import { useRouter } from 'next/router'
import { useLimiter } from '../../../../HookedComponents/Limiter'
import { DeepWritable } from 'ts-essentials'
import { NavigationMenuHorizontal } from '@//:assets/icons'

interface Props {
  query: PostClickableCategoriesFragment$key | null
}

const Fragment = graphql`
  fragment PostClickableCategoriesFragment on Post {
    categories {
      id
      slug
      title
      thumbnail {
        ...ResourceIconFragment
      }
    }
  }
`

export default function PostClickableCategories ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const router = useRouter()

  const {
    constructedData,
    onExpand,
    hasExpansion,
    hiddenData
  } = useLimiter<DeepWritable<PostClickableCategoriesFragment$data['categories']>>({
    data: data?.categories as DeepWritable<PostClickableCategoriesFragment$data['categories']> ?? [],
    amount: 7
  })

  const onClick = (node): void => {
    const encodedQuery = encodeQueryParams(configMap, {
      categories: node.slug,
      sort: 'TOP'
    })

    void router.push(`/search?${stringify(encodedQuery)}`)
  }

  return (
    <Wrap overflow='show'>
      {constructedData.map((item, index) =>
        <WrapItem key={index}>
          <ClickableBox onClick={() => onClick(item)} variant='ghost' borderRadius='semi' bg='transparent' p={0}>
            <SmallBackgroundBox borderRadius='inherit' align='center' p={1}>
              <HStack align='center' mr={1} spacing={2}>
                <ResourceIcon w={6} h={6} seed={item.id} query={item.thumbnail} />
                <Heading color='gray.00' fontSize='md'>{item.title}</Heading>
              </HStack>
            </SmallBackgroundBox>
          </ClickableBox>
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
