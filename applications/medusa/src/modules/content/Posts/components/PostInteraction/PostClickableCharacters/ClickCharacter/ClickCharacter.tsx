import { graphql, useFragment } from 'react-relay'
import type { ClickCharacterFragment$key } from '@//:artifacts/ClickCharacterFragment.graphql'
import { encodeQueryParams } from 'serialize-query-params'
import { stringify } from 'query-string'
import { configMap } from '../../../PostNavigation/PostsSearch/constants'
import ClickableBox from '../../../../../ThemeComponents/ClickableBox/ClickableBox'
import { Heading } from '@chakra-ui/react'
import { useRouter } from 'next/router'

interface Props {
  query: ClickCharacterFragment$key
}

const Fragment = graphql`
  fragment ClickCharacterFragment on Character {
    name
    slug
    series {
      slug
    }
  }
`

export default function ClickCharacter ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const router = useRouter()

  const onClick = (): void => {
    const encodedQuery = encodeQueryParams(configMap, {
      characters: {
        [data.slug]: data.series.slug
      },
      sort: 'TOP'
    })

    void router.push(`/search?${stringify(encodedQuery)}`)
  }

  return (
    <ClickableBox p={0} onClick={onClick}>
      <Heading color='gray.00' fontSize='2xl'>
        {data.name}
      </Heading>
    </ClickableBox>
  )
}
