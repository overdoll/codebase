import { useFragment } from 'react-relay/hooks'
import { graphql } from 'react-relay'
import { CopyLinkPublicPostFragment$key } from '@//:artifacts/CopyLinkPublicPostFragment.graphql'
import { Flex, Input, InputGroup, InputLeftAddon } from '@chakra-ui/react'
import Button from '@//:modules/form/Button/Button'
import { Trans } from '@lingui/macro'
import { useCopyToClipboardWrapper } from '@//:modules/hooks'
import { resolveHref } from 'next/dist/shared/lib/router/router'
import { useRouter } from 'next/router'

interface Props {
  postQuery: CopyLinkPublicPostFragment$key
}

const PostFragment = graphql`
  fragment CopyLinkPublicPostFragment on Post {
    id
    reference
    club {
      slug
    }
  }
`

export default function CopyLinkPublicPost (props: Props): JSX.Element {
  const { postQuery } = props

  const postData = useFragment(PostFragment, postQuery)

  const router = useRouter()

  const [, resolved] = resolveHref(router, {
    pathname: '/[slug]/post/[reference]',
    query: {
      slug: postData.club.slug,
      reference: postData.reference
    }
  }, true)

  const fullLink = `https://overdoll.com${resolved}`

  const [, onCopy] = useCopyToClipboardWrapper({ text: fullLink })

  return (
    <Flex w='100%'>
      <InputGroup size='sm'>
        <InputLeftAddon>
          <Trans>
            Repost
          </Trans>
        </InputLeftAddon>
        <Input
          readOnly
          variant='filled'
          placeholder=''
          value={fullLink}
          borderRightRadius='none'
        />
      </InputGroup>
      <Button
        borderLeftRadius='none'
        size='sm'
        onClick={onCopy}
      >
        <Trans>
          Copy Link
        </Trans>
      </Button>
    </Flex>
  )
}
