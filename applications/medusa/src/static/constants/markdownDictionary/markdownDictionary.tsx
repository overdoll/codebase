import { Divider, Heading, ListItem, OrderedList, Text, UnorderedList } from '@chakra-ui/react'
import type { Components } from 'react-markdown'

export default function markdownDictionary (): Components {
  return {
    h1: ({
      ...rest
    }) => <Heading color='gray.00' fontSize='6xl' {...rest} />,
    h2: ({
      ...rest
    }) => <Heading color='gray.00' fontSize='5xl' {...rest} />,
    h3: ({
      ...rest
    }) => <Heading color='gray.00' fontSize='4xl' {...rest} />,
    h4: ({
      ...rest
    }) => <Heading color='gray.00' fontSize='3xl' {...rest} />,
    h5: ({
      ...rest
    }) => <Heading color='gray.00' fontSize='2xl' {...rest} />,
    h6: ({
      ...rest
    }) => <Heading color='gray.00' fontSize='xl' {...rest} />,
    p: ({
      ...rest
    }) => <Text fontSize='lg' {...rest} />,
    hr: ({
      ...rest
    }) => <Divider {...rest} />,
    ol: ({
      ...rest
    }) => <OrderedList {...rest} />,
    ul: ({
      ...rest
    }) => <UnorderedList {...rest} />,
    li: ({
      ...rest
    }) => <ListItem ml={8} {...rest} />

  }
}
