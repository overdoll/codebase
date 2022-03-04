import { graphql, PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks'
import { AdminViewRuleQuery } from '@//:artifacts/AdminViewRuleQuery.graphql'
import { Box, Stack } from '@chakra-ui/react'
import { NotFoundGeneric } from '@//:modules/content/Placeholder'
import ChangeRuleTitle from './ChangeRuleTitle/ChangeRuleTitle'
import ChangeRuleDescription from './ChangeRuleDescription/ChangeRuleDescription'
import ChangeRuleInfraction from './ChangeRuleInfraction/ChangeRuleInfraction'
import ChangeRuleDeprecated from './ChangeRuleDeprecated/ChangeRuleDeprecated'

interface Props {
  query: PreloadedQuery<AdminViewRuleQuery>
}

const Query = graphql`
  query AdminViewRuleQuery($reference: String!) {
    rule(reference: $reference) {
      ...ChangeRuleTitleFragment
      ...ChangeRuleDescriptionFragment
      ...ChangeRuleInfractionFragment
      ...ChangeRuleDeprecatedFragment
    }
  }
`

export default function AdminViewRule ({ query }: Props): JSX.Element {
  const queryData = usePreloadedQuery<AdminViewRuleQuery>(
    Query,
    query
  )

  if (queryData?.rule == null) {
    return <NotFoundGeneric />
  }

  return (
    <Stack spacing={8}>
      <Box>
        <ChangeRuleTitle query={queryData?.rule} />
      </Box>
      <Box>
        <ChangeRuleDescription query={queryData?.rule} />
      </Box>
      <Box>
        <ChangeRuleInfraction query={queryData?.rule} />
      </Box>
      <Box>
        <ChangeRuleDeprecated query={queryData?.rule} />
      </Box>
    </Stack>
  )
}
