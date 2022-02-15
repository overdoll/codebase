import { HStack, Text } from '@chakra-ui/react'
import { graphql, useFragment } from 'react-relay/hooks'
import { TranslationSnippetFragment$key } from '@//:artifacts/TranslationSnippetFragment.graphql'
import { SmallBackgroundBox } from '@//:modules/content/PageLayout'

interface Props {
  query: TranslationSnippetFragment$key
}

const Fragment = graphql`
  fragment TranslationSnippetFragment on Translation {
    text
    language {
      locale
      name
    }
  }
`

export default function TranslationSnippet ({
  query
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  return (
    <SmallBackgroundBox py={1}>
      <HStack spacing={2} justify='space-between'>
        <Text color='gray.00'>
          {data.text}
        </Text>
        <Text color='gray.100'>
          {data.language.name} ({data.language.locale})
        </Text>
      </HStack>
    </SmallBackgroundBox>
  )
}
