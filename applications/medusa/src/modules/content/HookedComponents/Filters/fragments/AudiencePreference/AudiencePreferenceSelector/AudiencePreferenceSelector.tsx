import { graphql, useLazyLoadQuery } from 'react-relay/hooks'
import type { AudiencePreferenceSelectorQuery } from '@//:artifacts/AudiencePreferenceSelectorQuery.graphql'
import { AudienceTileOverlay, GridWrap } from '@//:modules/content/ContentSelection'
import { ComponentChoiceArguments } from '@//:modules/content/HookedComponents/Choice/types'
import { ComponentSearchArguments } from '@//:modules/content/HookedComponents/Search/types'
import { Choice } from '@//:modules/content/HookedComponents/Choice'
import ShortGridTile from '@//:modules/content/ContentSelection/ShortGridTile/ShortGridTile'
import { Heading, Stack, Tag, TagLabel, Wrap } from '@chakra-ui/react'
import { Trans } from '@lingui/macro'

interface Props extends ComponentChoiceArguments<any>, ComponentSearchArguments<any> {
  values: Record<string, any>
}

const Query = graphql`
  query AudiencePreferenceSelectorQuery {
    audiences (first: 100) {
      edges {
        node {
          id
          title
          ...AudienceTileOverlayFragment
        }
      }
    }
  }
`

export default function AudiencePreferenceSelector (props: Props): JSX.Element {
  const {
    searchArguments,
    register,
    values
  } = props

  const data = useLazyLoadQuery<AudiencePreferenceSelectorQuery>(
    Query,
    searchArguments.variables,
    searchArguments.options
  )

  const restrictedAudiences = data.audiences.edges.filter((item) => values[item.node.id] == null)

  return (
    <Stack spacing={2}>
      <GridWrap>
        {data.audiences.edges.map((item) => (
          <ShortGridTile key={item.node.id}>
            <Choice
              {...register(item.node.id, { title: item.node.title })}
            >
              <AudienceTileOverlay query={item.node} />
            </Choice>
          </ShortGridTile>
        )
        )}
      </GridWrap>
      {(Object.keys(values).length < 1 || Object.keys(values).length === data.audiences.edges.length)
        ? (
          <Heading fontSize='md' color='green.400'>
            <Trans>
              We'll show you everything
            </Trans>
          </Heading>
          )
        : (
          <Stack spacing={4}>
            <Stack spacing={1}>
              <Heading fontSize='md' color='gray.100'>
                <Trans>
                  I want to see
                </Trans>
              </Heading>
              <Wrap>
                {(Object.values(values)).map((item) => (
                  <Tag key={item.title} color='green.300' borderRadius='full' size='md'>
                    <TagLabel>{item.title}</TagLabel>
                  </Tag>))}
              </Wrap>
            </Stack>
            <Stack spacing={1}>
              <Heading fontSize='md' color='gray.100'>
                <Trans>
                  Don't show me
                </Trans>
              </Heading>
              <Wrap>
                {restrictedAudiences.map((item) => (
                  <Tag key={item.node.id} color='red.300' borderRadius='full' size='md'>
                    <TagLabel>{item.node.title}</TagLabel>
                  </Tag>
                ))}
              </Wrap>
            </Stack>
          </Stack>
          )}
    </Stack>
  )
}
