import { graphql, PreloadedQuery, usePreloadedQuery } from 'react-relay/hooks'
import type { CurationProfileSetupQuery } from '@//:artifacts/CurationProfileSetupQuery.graphql'
import { Trans } from '@lingui/macro'
import { UserHuman } from '@//:assets/icons/navigation'
import { Box } from '@chakra-ui/react'
import { DateOfBirthStepFragment$key } from '@//:artifacts/DateOfBirthStepFragment.graphql'
import { CategoryIdentifier, ClubMembers } from '@//:assets/icons/interface'
import {
  FlowBuilder,
  FlowBuilderBody,
  FlowBuilderFooter,
  FlowBuilderHeader,
  FlowBuilderSkipper
} from '../../../../../../../components/FlowBuilder'
import DateOfBirthStep from './DateOfBirthStep/DateOfBirthStep'

interface Props {
  query: PreloadedQuery<CurationProfileSetupQuery>
}

const Query = graphql`
  query CurationProfileSetupQuery {
    viewer {
      curationProfile {
        id
        completed
        ...DateOfBirthStepFragment
      }
    }
  }
`

export default function CurationProfileSetup (props: Props): JSX.Element | null {
  const queryData = usePreloadedQuery<CurationProfileSetupQuery>(
    Query,
    props.query
  )

  const steps = ['dateOfBirth', 'audience', 'category']

  const components = {
    dateOfBirth: <DateOfBirthStep
      query={queryData?.viewer?.curationProfile as DateOfBirthStepFragment$key}
                 />,
    audience: <>step 2</>,
    category: <>step 3</>
  }

  const headers = {
    dateOfBirth: {
      title: <Trans>
        Your Age
      </Trans>,
      icon: UserHuman
    },
    audience: {
      title: <Trans>
        Audiences
      </Trans>,
      icon: ClubMembers
    },
    category: {
      title: <Trans>
        Categories
      </Trans>,
      icon: CategoryIdentifier
    }
  }

  return (
    <FlowBuilder
      colorScheme='orange'
      stepsArray={steps}
      stepsComponents={components}
      stepsHeaders={headers}
    >
      <Box bg='gray.800' borderRadius='md' p={3} spacing={2}>
        <FlowBuilderHeader />
        <FlowBuilderSkipper />
      </Box>
      <FlowBuilderBody />
      <FlowBuilderFooter />
    </FlowBuilder>
  )
}
