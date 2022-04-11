import { graphql, useFragment } from 'react-relay'
import type { ClickSeriesFragment$key } from '@//:artifacts/ClickSeriesFragment.graphql'
import { encodeQueryParams } from 'serialize-query-params'
import { stringify } from 'query-string'
import { configMap } from '../../../PostNavigation/PostsSearch/constants'
import { useHistory } from '../../../../../../routing'
import { Heading } from '@chakra-ui/react'
import ClickableBox from '../../../../../ThemeComponents/ClickableBox/ClickableBox'

interface Props {
  query: ClickSeriesFragment$key
}

const Fragment = graphql`
  fragment ClickSeriesFragment on Character {
    series {
      title
      slug
    }
  }
`

export default function ClickSeries ({ query }: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const history = useHistory()

  const onClick = (): void => {
    const encodedQuery = encodeQueryParams(configMap, {
      series: [data.series.slug],
      sort: 'TOP'
    })

    history.push(`/search?${stringify(encodedQuery)}`)
  }

  return (
    <ClickableBox p={0} onClick={onClick}>
      <Heading color='gray.200' fontSize='md'>
        {data.series.title}
      </Heading>
    </ClickableBox>
  )
}
