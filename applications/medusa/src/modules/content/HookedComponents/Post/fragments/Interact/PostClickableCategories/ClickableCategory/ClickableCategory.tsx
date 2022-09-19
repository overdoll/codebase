import { graphql, useFragment } from 'react-relay/hooks'
import { ClickableCategoryFragment$key } from '@//:artifacts/ClickableCategoryFragment.graphql'
import { Heading, useConst } from '@chakra-ui/react'
import { SmallBackgroundBox } from '../../../../../../PageLayout'
import { LinkTile } from '../../../../../../ContentSelection'
import { useMemo } from 'react'
import { Random } from '../../../../../../../utilities/random'
import hash from '../../../../../../../utilities/hash'
import { DEFAULT_SEED, TAG_COLOR_PALETTE } from '../../../../../../../constants/theme'

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

export default function ClickableCategory ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const memoized = useMemo(() => new Random(hash(data.id ?? DEFAULT_SEED)), [data.id])

  const chosenColor = useMemo(() => memoized.nextInt32([0, TAG_COLOR_PALETTE.length]), [data.id])

  const randomValues = useConst({
    colors: chosenColor
  })

  const randomColor = TAG_COLOR_PALETTE[randomValues.colors]

  return (
    <LinkTile
      linkProps={{
        prefetch: false
      }}
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
