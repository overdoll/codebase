import ReactMarkdown from 'react-markdown'
import markdownDictionary from '../../../constants/markdownDictionary/markdownDictionary'
import PageContents from '../../../components/PageContents/PageContents'
import { Stack } from '@chakra-ui/react'

interface Props {
  content: string
}

export default function PrivacyPolicy ({ content }: Props): JSX.Element {
  return (
    <PageContents>
      <Stack spacing={4}>
        <ReactMarkdown
          components={markdownDictionary()}
        >
          {content}
        </ReactMarkdown>
      </Stack>

    </PageContents>
  )
}
