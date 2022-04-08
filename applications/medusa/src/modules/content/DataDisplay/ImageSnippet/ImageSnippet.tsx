import { Box, Heading, HTMLChakraProps, Skeleton, Stack } from '@chakra-ui/react'
import SuspenseImage from '../../../operations/SuspenseImage'
import { graphql } from 'react-relay/hooks'
import { useFragment } from 'react-relay'
import type { ImageSnippetFragment$key } from '@//:artifacts/ImageSnippetFragment.graphql'
import { useState } from 'react'
import Icon from '../../PageLayout/Flair/Icon/Icon'
import { WarningTriangle } from '@//:assets/icons'
import { Trans } from '@lingui/macro'

interface Props extends HTMLChakraProps<any> {
  query: ImageSnippetFragment$key | null
  h?: string | undefined
  w?: string | undefined
}

const Fragment = graphql`
  fragment ImageSnippetFragment on Resource {
    urls {
      url
      mimeType
    }
  }
`

export default function ImageSnippet ({
  query,
  h,
  w,
  ...rest
}: Props): JSX.Element {
  const data = useFragment(Fragment, query)

  const [hasError, setHasError] = useState(false)

  if (hasError) {
    return (
      <Stack borderRadius='md' p={4} bg='dimmers.500' direction='column' justify='center' align='center' spacing={2}>
        <Icon icon={WarningTriangle} w={6} h={6} fill='orange.300' />
        <Heading fontSize='md' color='orange.300'>
          <Trans>
            Error Loading Image
          </Trans>
        </Heading>
      </Stack>
    )
  }

  return (
    <Box h={h} w={w} as='picture'>
      {data?.urls.map((item, index) =>
        (
          <source
            key={index}
            srcSet={item.url}
            type={item.mimeType}
          />
        )
      )}
      <SuspenseImage
        onError={() => setHasError(true)}
        alt='thumbnail'
        w='inherit'
        h='inherit'
        objectFit='cover'
        userSelect='none'
        src={data?.urls[data?.urls.length - 1].url}
        fallback={<Skeleton w='100%' h='100%' />}
        {...rest}
      />
    </Box>
  )
}
