import { Heading, HStack, Wrap, WrapItem } from '@chakra-ui/react'
import { graphql, useFragment } from 'react-relay'
import type {
  PostClickableCharactersFragment$data,
  PostClickableCharactersFragment$key
} from '@//:artifacts/PostClickableCharactersFragment.graphql'
import { ClickableBox, Icon, SmallBackgroundBox } from '../../../../PageLayout'
import { useLimiter } from '../../../../HookedComponents/Limiter'
import { NavigationMenuHorizontal } from '@//:assets/icons'
import { DeepWritable } from 'ts-essentials'
import ClickableCharacter from './ClickableCharacter/ClickableCharacter'

interface Props {
  query: PostClickableCharactersFragment$key | null
}

const Fragment = graphql`
  fragment PostClickableCharactersFragment on Post {
    characters {
      id
      ...ClickableCharacterFragment
    }
  }
`

export default function PostClickableCharacters ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const {
    constructedData,
    onExpand,
    hasExpansion,
    hiddenData
  } = useLimiter<DeepWritable<PostClickableCharactersFragment$data['characters']>>({
    data: data?.characters as DeepWritable<PostClickableCharactersFragment$data['characters']> ?? [],
    amount: 3
  })

  return (
    <Wrap overflow='show'>
      {constructedData.map((item, index) =>
        <WrapItem key={item.id}>
          <ClickableCharacter query={item} />
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
