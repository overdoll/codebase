import { ClubBlurbFragment$key } from '@//:artifacts/ClubBlurbFragment.graphql'
import { graphql, useFragment } from 'react-relay'
import { Flex, Heading, Stack, Text } from '@chakra-ui/react'
import { Trans } from '@lingui/macro'

interface Props {
  clubQuery: ClubBlurbFragment$key
}

const Fragment = graphql`
  fragment ClubBlurbFragment on Club {
    name
    blurb
  }
`

export default function ClubBlurb (props: Props): JSX.Element {
  const { clubQuery } = props

  const data = useFragment(Fragment, clubQuery)

  if (data.blurb.length === 0) {
    return <></>
  }

  return (
    <Flex bg='gray.800' borderRadius='md' p={3}>
      <Stack>
        <Heading fontSize='md' color='gray.00'>
          <Trans>
            About {data.name}
          </Trans>
        </Heading>
        <Text fontSize='md' color='gray.00'>
          {data.blurb}
        </Text>
      </Stack>
    </Flex>
  )
}
