import { FeatureSupportSummaryFragment$key } from '@//:artifacts/FeatureSupportSummaryFragment.graphql'
import { graphql } from 'react-relay'
import { useFragment } from 'react-relay/hooks'
import { Heading, HStack, Stack, Text } from '@chakra-ui/react'
import { Trans } from '@lingui/macro'
import ClubIcon from '@//:modules/content/PageLayout/Display/fragments/Icon/ClubIcon/ClubIcon'
import ClubSupportBenefitsSummary from '../../../ClubSupportBenefitsSummary/ClubSupportBenefitsSummary'

interface Props {
  query: FeatureSupportSummaryFragment$key
}

const Fragment = graphql`
  fragment FeatureSupportSummaryFragment on Club {
    name
    ...ClubIconFragment
  }
`

export default function FeatureSupportSummary (props: Props): JSX.Element {
  const {
    query
  } = props

  const data = useFragment(Fragment, query)

  return (
    <Stack spacing={4}>
      <Stack spacing={1}>
        <HStack spacing={3}>
          <ClubIcon size='md' clubQuery={data} />
          <Heading
            noOfLines={1}
            fontSize='2xl'
            color='gray.00'
          >
            {data.name}
          </Heading>
        </HStack>
        <Text fontSize='sm' color='gray.200'>
          <Trans>
            Become a supporter to help {data.name} keep doing what they're doing.
          </Trans>
        </Text>
      </Stack>
      <ClubSupportBenefitsSummary />
    </Stack>
  )
}
