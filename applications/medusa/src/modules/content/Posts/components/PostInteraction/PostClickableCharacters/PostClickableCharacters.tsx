import { Heading, HStack, Wrap, WrapItem } from '@chakra-ui/react'
import { graphql, useFragment } from 'react-relay'
import type {
  PostClickableCharactersFragment$data,
  PostClickableCharactersFragment$key
} from '@//:artifacts/PostClickableCharactersFragment.graphql'
import { ClickableBox, Icon, ResourceIcon, SmallBackgroundBox } from '../../../../PageLayout'
import { encodeQueryParams } from 'serialize-query-params'
import { configMap } from '../../PostNavigation/PostsSearch/constants'
import { stringify } from 'query-string'
import { useRouter } from 'next/router'
import { useLimiter } from '../../../../HookedComponents/Limiter'
import { NavigationMenuHorizontal } from '@//:assets/icons'
import type { ResourceIconFragment$key } from '@//:artifacts/ResourceIconFragment.graphql'
import { DeepWritable } from 'ts-essentials'

interface Props {
  query: PostClickableCharactersFragment$key | null
}

const Fragment = graphql`
  fragment PostClickableCharactersFragment on Post {
    characters {
      id
      name
      slug
      series {
        slug
      }
      thumbnail {
        ...ResourceIconFragment
      }
    }
  }
`

export default function PostClickableCharacters ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const router = useRouter()

  const {
    constructedData,
    onExpand,
    hasExpansion,
    hiddenData
  } = useLimiter<DeepWritable<PostClickableCharactersFragment$data['characters']>>({
    data: data?.characters as DeepWritable<PostClickableCharactersFragment$data['characters']> ?? [],
    amount: 3
  })

  const onClick = (node): void => {
    const encodedQuery = encodeQueryParams(configMap, {
      characters: {
        [node.slug]: node.series.slug
      },
      sort: 'TOP'
    })

    void router.push(`/search?${stringify(encodedQuery)}`)
  }

  return (
    <Wrap overflow='show'>
      {constructedData.map((item, index) =>
        <WrapItem key={index}>
          <ClickableBox p={0} onClick={() => onClick(item)}>
            <SmallBackgroundBox p={2} borderRadius='inherit'>
              <HStack spacing={2} align='center'>
                <ResourceIcon
                  seed={item.id}
                  w={8}
                  h={8}
                  mr={2}
                  query={item.thumbnail as ResourceIconFragment$key}
                />
                <Heading noOfLines={1} color='gray.00' fontSize='xl'>
                  {item.name}
                </Heading>
              </HStack>
            </SmallBackgroundBox>
          </ClickableBox>
        </WrapItem>
      )}
      {hasExpansion && (
        <WrapItem>
          <ClickableBox p={0} onClick={onExpand}>
            <SmallBackgroundBox py={2} px={3} borderRadius='md'>
              <HStack spacing={3} align='center'>
                <Icon
                  w={6}
                  h={6}
                  fill='gray.100'
                  icon={NavigationMenuHorizontal}
                />
                <Heading color='gray.100' fontSize='lg'>
                  {hiddenData.length}
                </Heading>
              </HStack>
            </SmallBackgroundBox>
          </ClickableBox>
        </WrapItem>)}
    </Wrap>
  )
}
