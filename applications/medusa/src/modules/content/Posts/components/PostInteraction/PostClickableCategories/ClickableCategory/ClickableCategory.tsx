import { graphql, useFragment } from 'react-relay/hooks'
import { ClickableCategoryFragment$key } from '@//:artifacts/ClickableCategoryFragment.graphql'
import { Heading, useConst } from '@chakra-ui/react'
import { SmallBackgroundBox } from '@//:modules/content/PageLayout'
import { LinkTile } from '@//:modules/content/ContentSelection'
import { useMemo } from 'react'
import { Random } from '../../../../../../utilities/random'
import hash from '../../../../../../utilities/hash'

interface Props {
  query: ClickableCategoryFragment$key
}

const Fragment = graphql`
  fragment ClickableCategoryFragment on Category {
    id
    title
    slug
    thumbnail {
      preview
    }
  }
`

const defaultSeed = 'DETERMINISTIC_SEED'

export default function ClickableCategory ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const memoized = useMemo(() => new Random(hash(data.id ?? defaultSeed)), [data.id])

  const colors = [
    'purple.300',
    'orange.300',
    'teal.300',
    'green.300',
    'primary.300'
  ]

  const chosenColor = useMemo(() => memoized.nextInt32([0, 6]), [data.id])

  const randomValues = useConst({
    colors: chosenColor
  })

  const randomColor = colors[randomValues.colors]

  return (
    <LinkTile
      href={{
        pathname: '/search/category/[categorySlug]',
        query: {
          categorySlug: data.slug
        }
      }}
      p={0}
    >
      <SmallBackgroundBox
        borderLeftWidth={6}
        borderColor={data?.thumbnail?.preview ?? randomColor}
        borderRadius='inherit'
        align='center'
        px={2}
        py={1}
      >
        <Heading color='gray.100' fontSize='md'>{data.title}</Heading>
      </SmallBackgroundBox>
    </LinkTile>
  )
}
